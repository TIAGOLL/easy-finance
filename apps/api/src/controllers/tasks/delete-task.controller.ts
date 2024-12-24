import { Body, Controller, Delete, HttpCode, NotFoundException, UseGuards } from '@nestjs/common';
import { z } from 'zod';

import { JwtAuthGuard } from '@/auth/jwt-auth-guard';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const DeleteTaksSchema = z.object({
	id: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(DeleteTaksSchema);

type DeleteTaksSchema = z.infer<typeof DeleteTaksSchema>;

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class DeleteTask {
	constructor(private readonly prisma: PrismaService) {}

	@Delete()
	@HttpCode(200)
	async handle(@Body(bodyValidationPipe) body: DeleteTaksSchema) {
		const { id } = body;

		const taskExists = await this.prisma.tasks.findUnique({
			where: {
				id,
			},
		});

		if (!taskExists) {
			throw new NotFoundException('A tarefa não foi encontrada.');
		}

		await this.prisma.tasks.delete({
			where: {
				id,
			},
		});

		return { message: 'A tarefa foi deletada.' };
	}
}
