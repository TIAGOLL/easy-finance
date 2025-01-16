import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user-decorator';
import type { UserPayload } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const CreateTaskSchema = z.object({
	title: z.string(),
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
		const { title } = body;
		const { sub: userid } = user;

		await this.prisma.$transaction([
			this.prisma.tasks.create({
				data: {
					user_id: userid,
					title,
				},
			}),
		]);

		return { message: 'A tarefa foi criada.' };
	}
}
