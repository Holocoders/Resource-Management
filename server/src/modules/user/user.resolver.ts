import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from 'src/decorators/auth.decorator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { SharedService } from 'src/modules/shared/shared.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly sharedService: SharedService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findById(@Args('_id', { type: () => String }) id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateProfilePicture(
    @CurrentUser() user,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    console.log(user);
    const path = `./uploads/${user._id}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return path;
  }

  @Mutation(() => User)
  removeUser(@Args('_id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
