import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Get ConfigService after app is created
  const configService = app.get(ConfigService);
  
  console.log('Environment variables check:');
  console.log('MONGO_URI:', configService.get('MONGO_URI') ? '✅ Loaded' : '❌ Missing');
  console.log('JWT_SECRET:', configService.get('JWT_SECRET') ? '✅ Loaded' : '❌ Missing');
  console.log('JWT_EXPIRES_IN:', configService.get('JWT_EXPIRES_IN') ? '✅ Loaded' : '❌ Missing');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
