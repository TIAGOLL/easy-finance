import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { compare } from 'bcryptjs';
import { z } from 'zod';

import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const SignInWithEmailAndPasswordBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(SignInWithEmailAndPasswordBodySchema);

type SignInWithEmailAndPasswordBodySchema = z.infer<typeof SignInWithEmailAndPasswordBodySchema>;

@Controller('/sessions')
@ApiTags('Sign-in with e-mail and password')
export class SignInWithEmailAndPasswordController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}

	@Post('password')
	@ApiOperation({ summary: 'Sign-in user', parameters: [] })
	@HttpCode(201)
	async handle(@Body(bodyValidationPipe) body: SignInWithEmailAndPasswordBodySchema) {
		const { email, password } = body;
		const user = await this.prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Credenciais incorretas.');
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Credenciais incorretas.');
		}

		const token = this.jwt.sign({ sub: user.id });

		return { token, message: 'Bem vindo novamente!' };
	}
}
