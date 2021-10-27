import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppResolver } from './app.resolver';
import { CategoryModule } from './modules/category/category.module';
import { NodeModule } from './modules/node/node.module';
import { InventoryHistoryModule } from './modules/inventory-history/inventory-history.module';
import { ItemHistoryModule } from './modules/item-history/item-history.module';
import { FacilityModule } from './modules/facility/facility.module';
import { ItemModule } from './modules/item/item.module';

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
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    AuthModule,
    FacilityModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
