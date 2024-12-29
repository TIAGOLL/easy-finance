import type { users } from '@prisma/client';

import { PrismaService } from './prisma.service';

const DEFAULT_USERS: Array<Omit<users, 'id'>> = [
	{
		name: 'Tiago Emanuel de Lima',
		email: 'tiagoepitanga10@gmail.com',
		email_verified: false,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Tim Apple',
		email: 'tim@apple.com',
		email_verified: true,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Jane Doe',
		email: 'jane.doe@example.com',
		email_verified: false,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'John Smith',
		email: 'john.smith@domain.com',
		email_verified: true,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Alice Wonderland',
		email: 'alice@wonderland.com',
		email_verified: true,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Bob Builder',
		email: 'bob@builder.com',
		email_verified: false,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Charlie Chaplin',
		email: 'charlie@chaplin.com',
		email_verified: true,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Diana Prince',
		email: 'diana@prince.com',
		email_verified: true,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Evan Bright',
		email: 'evan.bright@example.com',
		email_verified: false,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'Fiona Shrek',
		email: 'fiona@shrek.com',
		email_verified: true,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
	{
		name: 'George Jetson',
		email: 'george.jetson@future.com',
		email_verified: false,
		password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
		created_at: null,
		updated_at: null,
	},
];

const prisma = new PrismaService();

async function main() {
	await prisma.$transaction([prisma.tokens.deleteMany({}), prisma.tasks.deleteMany({}), prisma.accounts.deleteMany({}), prisma.users.deleteMany({})]);

	DEFAULT_USERS.map(
		async (user) =>
			await prisma.$transaction([
				prisma.users.upsert({
					where: {
						email: user.email,
					},
					update: {
						...user,
					},
					create: {
						...user,
					},
				}),
			])
	);
}

main()
	.then(() => console.log('Database seeded.'))
	.catch((error) => console.log(error));
