import { Body, Controller, HttpCode, Patch, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';

import { MailSenderService } from '@/mail/mail-sender.service';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const ResetPasswordBodySchema = z.object({
	token: z.string(),
	password: z.string().min(6, { message: 'A senha deve conter no minímo 6 caracteres.' }),
});

const bodyValidationPipe = new ZodValidationPipe(ResetPasswordBodySchema);

type ResetPasswordBodySchema = z.infer<typeof ResetPasswordBodySchema>;

@Controller('/auth')
export class resetPasswordController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mail: MailSenderService
	) {}

	@Patch('reset-password')
	@HttpCode(201)
	async handle(@Body(bodyValidationPipe) body: ResetPasswordBodySchema) {
		const { token, password } = body;
		const codeByToken = await this.prisma.tokens.findUnique({
			where: {
				id: token,
			},
		});

		if (!codeByToken) {
			throw new UnauthorizedException();
		}

		const passwordHash = await hash(password, 8);

		await this.prisma.users
			.update({
				where: {
					id: codeByToken.user_id,
				},
				data: {
					password: passwordHash,
				},
			})
			.catch((error) => {
				console.log(error);
				throw new ServiceUnavailableException('Não foi possível trocar sua senha, tente novamente mais tarde.');
			});

		return { message: 'A sua senha foi alterada.' };
	}
}
