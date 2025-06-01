import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mini Management App')
    .setDescription(
      'API for managing users, projects, and tasks.\n\n' +
        'Key features:\n' +
        '- User, project, and task CRUD operations\n' +
        '- Task assignment and status management\n' +
        '- Data validation via DTOs\n\n' +
        'This documentation helps developers interact with the backend endpoints.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
