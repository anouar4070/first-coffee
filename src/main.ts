import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // 👈 this allows type conversion based on the TypeScript type
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, //no need to specify types with @Type() on dto:  @Type(() => Number)
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
