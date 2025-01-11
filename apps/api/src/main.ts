import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Env } from './env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		abortOnError: false,
		cors: true,
	});

	const configService = app.get<ConfigService<Env, true>>(ConfigService);

	app.enableCors({
		origin: 'https://saas-front-nu.vercel.app', // Permite o domínio do frontend
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos permitidos
		credentials: true, // Permite envio de cookies/credenciais
		allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
	});

	const port = configService.get('PORT', { infer: true });

	// Swagger config
	const config = new DocumentBuilder().setTitle('Easy Finance API').setDescription('').setVersion('1.0').addTag('Users').addTag('Tasks').build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory);

	await app.listen(port);
}
bootstrap();
