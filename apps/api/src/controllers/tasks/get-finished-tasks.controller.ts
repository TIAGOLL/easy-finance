import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user-decorator';
import type { UserPayload } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1));

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/finished-tasks')
@UseGuards(JwtAuthGuard)
export class GetFinishedTaksController {
	constructor(private readonly prisma: PrismaService) {}

	@Get()
	async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema, @CurrentUser() user: UserPayload) {
		const { sub } = user;
		const perPage = 10;

		const tasks = await this.prisma.tasks.findMany({
			where: {
				user_id: sub,
				finished: true,
			},
			take: perPage,
			skip: (page - 1) * perPage,
			orderBy: {
				created_at: 'desc',
			},
		});

		const totalTasks = await this.prisma.tasks.count({
			where: {
				finished: true,
				user_id: sub,
			},
		});

		return { tasks, totalTasks };
	}
}
