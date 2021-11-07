import {Module} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryResolver} from './category.resolver';
import {NodeModule} from "../node/node.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Category, CategorySchema} from "./entities/category.entity";
import {SharedModule} from "../shared/shared.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    NodeModule,
    SharedModule
  ],
  providers: [CategoryResolver, CategoryService]
})
export class CategoryModule {}
