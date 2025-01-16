import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcryptjs';
import { MailSenderSchema, MailSenderService } from 'src/mail/mail-sender.service';
import { SignUpBody, SignUpSubject } from 'src/mail/mails/sign-up-body-email';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

import type { Env } from '../../env';

const SignUpWithEmailAndPasswordBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(SignUpWithEmailAndPasswordBodySchema);

type SignUpWithEmailAndPasswordBodySchema = z.infer<typeof SignUpWithEmailAndPasswordBodySchema>;

@Controller('/accounts')
export class SignUpWithEmailAndPasswordController {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mail: MailSenderService,
		private readonly config: ConfigService<Env, true>
	) {}

	@Post()
	@HttpCode(201)
	async handle(@Body(bodyValidationPipe) body: SignUpWithEmailAndPasswordBodySchema) {
		const { name, email, password } = body;

		const userWithSameEmail = await this.prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (userWithSameEmail) {
			throw new ConflictException('Já existe um usuário com esse endereço de e-mail.');
		}

		const hashedPassword = await hash(password, 8);

		await this.prisma.users
			.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			})
			.then(async (e) => {
				const dto: MailSenderSchema = {
					html: SignUpBody,
					recipients: [{ name: e.name, address: e.email }],
					subject: SignUpSubject,
				};

				await this.mail.SendEmail(dto);
			});

		return { message: 'Cadastro concluído.' };
	}
}
