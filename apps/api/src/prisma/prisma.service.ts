import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor() {
		super({
			log: ['warn', 'error'],
		});
	}

	// Aguarda a conexão com o banco de dados na inicialização do módulo
	async onModuleInit() {
		await this.$connect();
	}

	// Aguarda a desconexão do banco de dados na destruição do módulo
	async onModuleDestroy() {
		await this.$disconnect();
	}
}
