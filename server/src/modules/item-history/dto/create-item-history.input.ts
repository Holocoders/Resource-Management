import {InputType} from '@nestjs/graphql';
import {Item} from "../../item/entities/item.entity";
import {User} from "../../user/entities/user.entity";

@InputType()
export class CreateItemHistoryInput {
  itemId: string;
  userId: string;
  quantity: number;
  currentDate: Date;
  cancelled: boolean;
  issued: boolean;
  status: boolean;
  issueDate: Date;
  dueDate: Date;
}
