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
		origin: 'https://saas-front-nu.vercel.app', // Permitir apenas essa origem
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
		credentials: true, // Se você precisa enviar cookies ou cabeçalhos de autenticação
	});

	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', 'https://saas-front-nu.vercel.app');
		res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		next();
	});

	await app.listen(port || 3000);
}

bootstrap();
