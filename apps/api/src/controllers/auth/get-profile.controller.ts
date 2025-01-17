import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../auth/current-user-decorator';
import type { UserPayload } from '../../auth/jwt.strategy';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('/sessions')
@UseGuards(JwtAuthGuard)
export class GetProfileController {
	constructor(private readonly prisma: PrismaService) {}

	@Get('get-profile')
	async handle(@CurrentUser() user: UserPayload) {
		const { sub } = user;

		const result = await this.prisma.users.findUnique({
			where: {
				id: sub,
			},
			select: {
				created_at: true,
				email: true,
				email_verified: true,
				updated_at: true,
				name: true,
				id: true,
			},
		});

		if (!result) {
			throw new NotFoundException('O usuário não foi encontrado.');
		}

		return { ...result };
	}
}
