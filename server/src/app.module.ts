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
import { ItemModule } from './modules/item/item.module';
import { ItemHistoryModule } from './modules/item-history/item-history.module';
import { SharedModule } from './modules/shared/shared.module';
import { InventoryHistoryModule } from './modules/inventory-history/inventory-history.module';
import { NodeModule } from './modules/node/node.module';

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
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-lean-virtuals'));
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: true,
      sortSchema: true,
      uploads: false,
      context: ({ req }) => ({ req }),
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    }),
    UserModule,
    AuthModule,
    FacilityModule,
    CategoryModule,
    ItemModule,
    NodeModule,
    ItemHistoryModule,
    InventoryHistoryModule,
    SharedModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
