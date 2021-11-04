import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppResolver } from './app.resolver';
import { CategoryModule } from './modules/category/category.module';
import { FacilityModule } from './modules/facility/facility.module';
import { join } from 'path';

const env = process.env.NODE_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${env}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: true,
      sortSchema: true,
      uploads: false,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    FacilityModule,
    CategoryModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
