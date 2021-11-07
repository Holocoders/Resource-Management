import {Field, InputType} from '@nestjs/graphql';
import {User} from "../../user/entities/user.entity";

@InputType()
export class CreateCategoryInput {
  _id?: string;
  name: string;
  parent: string;
  description?: string;
  @Field()
  createdBy?: User;
}
