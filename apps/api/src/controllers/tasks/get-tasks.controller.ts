import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';

import { CurrentUser } from '@/auth/current-user-decorator';
import type { UserPayload } from '@/auth/jwt.strategy';
import { JwtAuthGuard } from '@/auth/jwt-auth-guard';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1));

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/tasks')
@UseGuards(JwtAuthGuard)
export class GetTaksController {
	constructor(private readonly prisma: PrismaService) {}

	@Get()
	async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema, @CurrentUser() user: UserPayload) {
		const { sub } = user;
		const perPage = 6;

		const tasks = await this.prisma.tasks.findMany({
			where: {
				user_id: sub,
			},
			take: perPage,
			skip: (page - 1) * perPage,
			orderBy: {
				created_at: 'desc',
			},
		});

		return { tasks };
	}
}
