import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";

@InputType()
export class CreateCategoryInput {
  _id?: string;
  name: string;
  parent: string;
  description?: string;
}
