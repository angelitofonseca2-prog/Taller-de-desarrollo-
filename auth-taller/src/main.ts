import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validación automática de DTOs
  // Configuración global de pipes de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Rechaza propiedades no definidas en DTO
      transform: true,
    }),
  );

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Habilitar CORS
  app.enableCors();

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
}
bootstrap();
