import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { z } from 'zod';

import { CurrentUser } from '@/auth/current-user-decorator';
import type { UserPayload } from '@/auth/jwt.strategy';
import { JwtAuthGuard } from '@/auth/jwt-auth-guard';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const CreateTaskSchema = z.object({
	name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(CreateTaskSchema);

type CreateTaskSchema = z.infer<typeof CreateTaskSchema>;

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class CreateTaskController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	async handle(@Body(bodyValidationPipe) body: CreateTaskSchema, @CurrentUser() user: UserPayload) {
		const { name } = body;
		const { sub: userid } = user;

		await this.prisma.$transaction([
			this.prisma.tasks.create({
				data: {
					user_id: userid,
					name,
				},
			}),
		]);
	}
}
