import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ErrorHandlerMiddleware } from './middlewares/errors/error-handler.middleware';

async function initializeApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.useGlobalFilters(new ErrorHandlerMiddleware())

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health-check', method: RequestMethod.GET }]
  })

  return app;
}

async function bootstrap() {
  const app = await initializeApp();

  await app.listen(Number(process.env.PORT));
  console.log(`@maxmilhas-blacklist-api started on port ${process.env.PORT}`)
}

bootstrap();


