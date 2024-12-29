import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Address } from 'nodemailer/lib/mailer';
import type Mail from 'nodemailer/lib/mailer';

import type { Env } from '@/env';

export type MailSenderSchema = {
	from?: Address;
	recipients: Address[];
	subject: string;
	html: string;
	text?: string;
	placeholderReplacements?: Record<string, string>;
};

@Injectable()
export class MailSenderService {
	constructor() {}
	private config = new ConfigService<Env, true>();

	private mailTransport() {
		const transport = nodemailer.createTransport({
			host: this.config.get('HOST_EMAIL_SENDER', { infer: true }),
			port: this.config.get('PORT_EMAIL_SENDER', { infer: true }),
			secure: true, // if port=465 ? true : false
			auth: {
				user: this.config.get('USER_EMAIL_SENDER', { infer: true }),
				pass: this.config.get('PASS_EMAIL_SENDER', { infer: true }),
			},
		});

		return transport;
	}

	async SendEmail({ from, recipients, subject, html }: MailSenderSchema) {
		const transport = this.mailTransport();

		const options: Mail.Options = {
			from: from ?? {
				name: this.config.get('APP_NAME', { infer: true }),
				address: this.config.get('USER_EMAIL_SENDER', { infer: true }),
			},
			to: recipients,
			subject,
			html,
		};

		try {
			const result = await transport.sendMail(options);

			return result;
		} catch (error) {
			console.log(error);
		}
	}
}
