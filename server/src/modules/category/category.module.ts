import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import {NodeModule} from "../node/node.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Category, CategorySchema} from "./entities/category.entity";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    NodeModule
  ],
  providers: [CategoryResolver, CategoryService]
})
export class CategoryModule {}
