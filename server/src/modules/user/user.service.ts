import {Injectable, Logger} from '@nestjs/common';
import {CreateUserInput} from './dto/create-user.input';
import {User, UserDocument} from './entities/user.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {GraphQLError} from 'graphql';
import {GetUserInput} from './dto/get-user.input';
import {UpdatePasswordInput} from './dto/update-password.input';
import {UpdateUserInput} from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    createUserInput: CreateUserInput,
  ): Promise<UserDocument | GraphQLError> {
    const user = await this.userModel.findOne({ email: createUserInput.email });
    if (user) {
      const errorString = `Duplicate user registration: ${createUserInput.email}`;
      Logger.error(errorString);
      return new GraphQLError(errorString);
    } else {
      createUserInput.password = await bcrypt
        .hash(createUserInput.password, 10)
        .then((r) => r);
      return await new this.userModel(createUserInput).save();
    }
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findOne(getUserInput: GetUserInput) {
    return this.userModel.findOne(getUserInput);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  async updatePassword(id: string, updatePasswordInput: UpdatePasswordInput) {
    const user = await this.userModel.findById(id);
    if (await bcrypt.compare(updatePasswordInput.oldPassword, user.password)) {
      user.password = bcrypt.hash(updatePasswordInput.newPassword, 10);
      return user.save();
    } else {
      Logger.error(`User password does not match.`);
      return null;
    }
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
