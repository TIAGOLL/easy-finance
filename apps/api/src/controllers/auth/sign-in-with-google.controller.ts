import { Body, Controller, Post, ServiceUnavailableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';

import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const SignInWithGoogleBodySchema = z.object({
	accessToken: z.string(),
});

interface getProfileResponse {
	email: string;
	email_verified: boolean;
	family_name: string;
	given_name: string;
	name: string;
	picture: string;
	sub: string;
}

type signInWithGoogleBodySchema = z.infer<typeof SignInWithGoogleBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(SignInWithGoogleBodySchema);

@Controller('/auth')
export class SignInWithGoogle {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}

	@Post('google')
	async handle(@Body(bodyValidationPipe) body: signInWithGoogleBodySchema) {
		const { accessToken } = body;

		const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		if (!res.ok) {
			throw new ServiceUnavailableException(`Erro na comunicação com o Google: ${res.statusText}`);
		}

		const { email, name }: getProfileResponse = await res.json();

		let user = await this.prisma.users.findUnique({
			where: { email: email },
		});

		if (!user) {
			user = await this.prisma.users.create({
				data: {
					email,
					name,
				},
			});
		}

		const token = this.jwt.sign({ sub: user.id });

		return { message: 'Bem vindo novamente!', token };
	}
}
