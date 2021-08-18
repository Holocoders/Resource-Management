import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserInput: CreateUserInput): Promise<UserDocument> {
    const newUser = new this.userModel(createUserInput);
    return newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
