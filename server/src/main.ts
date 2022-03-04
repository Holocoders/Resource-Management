import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as cors_proxy from 'cors-anywhere';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const uploadsPath = join(__dirname, '..', 'uploads');
  app.useStaticAssets(uploadsPath);
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
  }
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  const port = process.env.PORT || 3000;
  const proxy_port = process.env.CORS_PROXY_PORT || 4000;
  Logger.debug(
    `Application running in ${
      process.env.NODE_ENV || 'dev'
    } mode on port ${port}`,
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, '0.0.0.0');

  const server = cors_proxy.createServer({
    originWhitelist: ['http://localhost:4200'], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  });
  Logger.debug(`Cors proxy server running on port ${proxy_port}`);
  await server.listen(proxy_port, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
