import 'dotenv/config'; // Carrega as variaveis de ambiente do arquivo .env
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // Configuracao global do ValidationPipe tenho que baixa o class-validator e class-transformer
  app.useGlobalPipes( new ValidationPipe(
    {
      whitelist: true, // nao permite propriedades extras que nao estejam no DTO
      forbidNonWhitelisted: true, // retorna erro se houver propriedades extras no DTO
      transform: false, // transforma os dados de entrada para os tipos definidos no DTO
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
