import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('user tecnopac')
    .setDescription('the User API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3000);

  console.log(`App listening on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
