import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const GetTasksByIdSchema = z.object({
	id: z.string(),
});

type GetTasksByIdSchema = z.infer<typeof GetTasksByIdSchema>;

const queryValidationPipe = new ZodValidationPipe(GetTasksByIdSchema);

@Controller('tasks')
export class GetTaskById {
	constructor(private readonly prisma: PrismaService) {}

	@Get('/:id')
	async handle(@Param(queryValidationPipe) params: GetTasksByIdSchema) {
		const { id } = params;

		const task = await this.prisma.tasks.findUnique({
			where: {
				id,
			},
		});

		if (!task) {
			throw new NotFoundException('A tarefa não foi encontrada.');
		}

		return { task };
	}
}
