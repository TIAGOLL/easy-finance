import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from '../src/env';
import { AuthModule } from './auth/auth.module';
import { GetProfileController } from './controllers/auth/get-profile.controller';
import { requestPasswordRecoverController } from './controllers/auth/request-password-recover.controller';
import { resetPasswordController } from './controllers/auth/reset-password.controller';
import { SignInWithEmailAndPasswordController } from './controllers/auth/sign-in-with-email-and-password.controller';
import { SignInWithGoogle } from './controllers/auth/sign-in-with-google.controller';
import { SignUpWithEmailAndPasswordController } from './controllers/auth/sign-up-with-email-and-password.controller';
import { CreateTaskController } from './controllers/tasks/create-task.controller';
import { DeleteTask } from './controllers/tasks/delete-task.controller';
import { FinishTaskController } from './controllers/tasks/finish-task.controller';
import { GetFinishedTaksController } from './controllers/tasks/get-finished-tasks.controller';
import { GetPendingTaksController } from './controllers/tasks/get-pending-tasks.controller';
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
		GetFinishedTaksController,
		GetProfileController,
		DeleteTask,
		GetTaskById,
		FinishTaskController,
		PutTasksController,
		GetPendingTaksController,
		SignInWithGoogle,
	],
	providers: [PrismaService, MailSenderService],
})
export class AppModule {}
