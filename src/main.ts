import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

console.log('JWT keys found:', Object.keys(process.env).filter(k => k.toUpperCase().includes('JWT_SECRET')));
console.log('MONGO_URL loaded:', !!process.env.MONGO_URL);
console.log('JWT_SECRET:', !!process.env.JWT_SECRET);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
bootstrap();
