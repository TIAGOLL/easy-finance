// import { createSeedClient } from '@snaplet/seed';
// import { randomUUID } from 'crypto';
// async function main() {
// 	const seed = await createSeedClient();
// 	console.log('Resetando banco de dados...');
// 	await seed.$resetDatabase();
// 	console.log('Criando usuários...');
// 	const { users } = await seed.users((x) => [
// 		{
// 			id: '52c3abbf-a1ac-4ce3-8da9-34c16710f28c',
// 			name: 'John Doe',
// 			email: 'john.doe@acme.com',
// 			email_verified: true,
// 			password: '$2a$08$3/43IUwQ3D8fb00F/AeHAumaS7gV1o2I33fbuBCjorBhTK3OKVmZu',
// 		},
// 		...x(10, () => ({ id: randomUUID() })),
// 	]);
// 	console.log('Criando tarefas...');
// 	await seed.tasks(
// 		(x) => x(1000, () => ({ id: randomUUID(), user_id: users[Math.floor(Math.random() * users.length)].id, finished: Math.random() < 0.5 })),
// 		{ connect: { users } }
// 	);
// }
// main()
// 	.then(() => console.log('Database seeded.'))
// 	.catch((error) => console.log(error));
