import {Injectable, Logger} from '@nestjs/common';
import {UserService} from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {GraphQLError} from 'graphql';
import {CreateUserInput} from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getToken(email, _id): Promise<string> {
    return await this.jwtService.signAsync({ email, _id });
  }

  async login({ email, password }) {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.getToken(email, user._id);
    } else {
      const errorString = `Invalid username or password`;
      Logger.error(errorString);
      return new GraphQLError(errorString);
    }
  }

  async googleLogin(createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
