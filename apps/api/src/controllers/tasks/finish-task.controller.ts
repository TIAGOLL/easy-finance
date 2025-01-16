import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const FinishTaskBodySchema = z.object({
	id: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(FinishTaskBodySchema);

type FinishTaskBodySchema = z.infer<typeof FinishTaskBodySchema>;

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class FinishTaskController {
	constructor(private readonly prisma: PrismaService) {}

	@Patch()
	async handle(@Body(bodyValidationPipe) body: FinishTaskBodySchema) {
		const { id } = body;

		await this.prisma.tasks.update({
			where: {
				id,
			},
			data: {
				finished: true,
			},
		});

		return { message: 'A tarefa foi finalizada.' };
	}
}
