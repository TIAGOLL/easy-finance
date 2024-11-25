import type { User } from '@prisma/client';

import { prisma } from './client';

const DEFAULT_USERS = [
	{
		name: 'Tim Apple',
		email: 'tim@apple.com',
	},
] as Array<Partial<User>>;

prisma.$transaction(async (trx) => {
	DEFAULT_USERS.map((user) =>
		trx.user.upsert({
			where: {
				email: user.email!,
			},
			update: {
				...user,
			},
			create: {
				...user,
			},
		})
	);
});
