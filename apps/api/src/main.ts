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
		origin: configService.get('WEB_URL', { infer: true }),
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
		credentials: true,
	});

	app.use((req, res, next) => {
		if (req.method === 'OPTIONS') {
			res.header('Access-Control-Allow-Origin', 'https://saas-front-nu.vercel.app');
			res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			res.header('Access-Control-Allow-Credentials', 'true');
			res.sendStatus(204); // No Content
		} else {
			next();
		}
	});

	const port = configService.get('PORT', { infer: true });

	// Swagger config
	const config = new DocumentBuilder().setTitle('Easy Finance API').setDescription('').setVersion('1.0').addTag('Users').addTag('Tasks').build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, documentFactory);

	await app.listen(port);
}
bootstrap();
