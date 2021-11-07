import {NestFactory} from '@nestjs/core';
import {graphqlUploadExpress} from 'graphql-upload';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import {join} from 'path';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as fs from "fs";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const uploadsPath = join(__dirname, '..', 'uploads');
  app.useStaticAssets(uploadsPath);
  if (!fs.existsSync(uploadsPath)){
    fs.mkdirSync(uploadsPath);
  }
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  Logger.debug(`Application running in ${process.env.NODE_ENV || 'dev'} mode`);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
