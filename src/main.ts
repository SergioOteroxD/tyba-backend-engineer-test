import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import rTracer = require('cls-rtracer');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  //Configuración librería para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Configuración librería para generación de identificador de solicitud
  app.use(rTracer.expressMiddleware());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const module = configService.get('MODULE');
  app.setGlobalPrefix(module);

  const config = new DocumentBuilder().setTitle('Prueba técnica Sergio Otero').setDescription('The test tyba API description').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT, async () => Logger.log('INFO', `Application is running on: port: ${await app.getUrl()}`, 'main'));
}
bootstrap();
