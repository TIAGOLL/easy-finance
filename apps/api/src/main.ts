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

	const port = configService.get('PORT', { infer: true });

	// Swagger config
	const config = new DocumentBuilder().setTitle('Easy Finance API').setDescription('').setVersion('1.0').addTag('Users').addTag('Tasks').build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory);

	app.enableCors({
		origin: 'https://saas-front-nu.vercel.app',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});

	await app.listen(port || 3000);
}

bootstrap();
