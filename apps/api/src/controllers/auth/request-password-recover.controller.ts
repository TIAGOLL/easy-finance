import { Body, Controller, HttpCode, Post, ServiceUnavailableException } from '@nestjs/common';
import { z } from 'zod';

import { MailSenderService } from '@/mail/mail-sender.service';
import { requestPasswordRecoverBody, requestPasswordRecoverSubject } from '@/mail/mails/request-password-recover';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const RequestPasswordRecoverBodySchema = z.object({
	email: z.string().email(),
});

const bodyValidationPipe = new ZodValidationPipe(RequestPasswordRecoverBodySchema);

type RequestPasswordRecoverBodySchema = z.infer<typeof RequestPasswordRecoverBodySchema>;

@Controller('/auth')
export class requestPasswordRecoverController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mail: MailSenderService
	) {}

	@Post('request-recover-password')
	@HttpCode(201)
	async handle(@Body(bodyValidationPipe) body: RequestPasswordRecoverBodySchema) {
		const { email } = body;

		const userByEmail = await this.prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (!userByEmail) {
			return { message: 'O E-mail foi enviado com suscesso.' };
		}

		const { id: token } = await this.prisma.tokens.create({
			data: {
				type: 'PASSWORD_RECOVER',
				user_id: userByEmail.id,
			},
		});

		await this.mail
			.SendEmail({
				html: requestPasswordRecoverBody({ token }),
				recipients: [{ name: userByEmail.name, address: userByEmail.email }],
				subject: requestPasswordRecoverSubject,
			})
			.catch((error) => {
				console.log(error);
				throw new ServiceUnavailableException('Ocorreu um erro, tente novamente mais tarde.');
			});

		return { message: 'O E-mail foi enviado com suscesso.' };
	}
}
