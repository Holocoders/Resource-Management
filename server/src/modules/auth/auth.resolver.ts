import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from '../user/entities/user.entity';
import {CreateUserInput} from '../user/dto/create-user.input';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import {GraphQLError} from 'graphql';
import {UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from './auth.guard';
import {CurrentUser} from '../../decorators/auth.decorator';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const password = createUserInput.password;
    const result = await this.userService.create(createUserInput);
    if (result instanceof GraphQLError) return result;
    const token = await this.authService.login({
      email: result.email,
      password,
    });
    result.token = token as string;
    return result;
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string | GraphQLError> {
    return await this.authService.login({ email, password });
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  currentUser(@CurrentUser() user, @Context() context) {
    const authHeader = context.req.headers.authorization;
    user.token = authHeader.split(" ")[1];
    return user;
  }
}
