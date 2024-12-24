import { Body, Controller, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { z } from 'zod';

import { JwtAuthGuard } from '@/auth/jwt-auth-guard';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const PutTaskSchema = z.object({
	id: z.string(),
	name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(PutTaskSchema);

type PutTaskSchema = z.infer<typeof PutTaskSchema>;

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class PutTasksController {
	constructor(private readonly prisma: PrismaService) {}

	@Put()
	async handle(@Body(bodyValidationPipe) body: PutTaskSchema) {
		const { id, name } = body;

		const taskExists = await this.prisma.tasks.findUnique({
			where: {
				id,
			},
		});

		if (!taskExists) {
			throw new NotFoundException('A tarefa não foi encontrada.');
		}

		await this.prisma.tasks.update({
			where: {
				id,
			},
			data: {
				name,
			},
		});

		return { message: 'A tarefa foi atualizada.' };
	}
}
