import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from '@/env';

import { AuthModule } from './auth/auth.module';
import { GetProfileController } from './controllers/auth/get-profile.controller';
import { requestPasswordRecoverController } from './controllers/auth/request-password-recover.controller';
import { resetPasswordController } from './controllers/auth/reset-password.controller';
import { SignInWithEmailAndPasswordController } from './controllers/auth/sign-in-with-email-and-password.controller';
import { SignUpWithEmailAndPasswordController } from './controllers/auth/sign-up-with-email-and-password.controller';
import { CreateTaskController } from './controllers/tasks/create-task.controller';
import { DeleteTask } from './controllers/tasks/delete-task.controller';
import { GetTaksController } from './controllers/tasks/get-tasks.controller';
import { GetTaskById } from './controllers/tasks/get-tasks-by-id.controller';
import { PutTasksController } from './controllers/tasks/put-tasks.controller';
import { MailSenderService } from './mail/mail-sender.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [
		SignInWithEmailAndPasswordController,
		SignUpWithEmailAndPasswordController,
		CreateTaskController,
		requestPasswordRecoverController,
		resetPasswordController,
		GetTaksController,
		GetProfileController,
		DeleteTask,
		GetTaskById,
		PutTasksController,
	],
	providers: [PrismaService, MailSenderService],
})
export class AppModule {}
