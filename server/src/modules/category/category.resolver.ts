import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CurrentUser } from '../../decorators/auth.decorator';
import { GraphQLError } from 'graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { SharedService } from '../shared/shared.service';
import { AuthorizeNode } from '../../decorators/metadata.decorator';

@Resolver(() => Category)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly sharedService: SharedService,
  ) {}

  @AuthorizeNode('createCategoryInput.parent')
  @Mutation(() => Category)
  async createCategory(
    @CurrentUser() user,
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const category = await this.categoryService.create(
      createCategoryInput,
      user._id,
    );
    const path = `./uploads/${category.node['_id']}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return category;
  }

  @AuthorizeNode('updateCategoryInput._id')
  @Mutation(() => Category)
  async updateCategory(
    @CurrentUser() user,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const category = await this.categoryService.update(
      updateCategoryInput._id,
      updateCategoryInput,
    );
    const path = `./uploads/${category.node['_id']}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return category;
  }

  @AuthorizeNode('id')
  @Mutation(() => String)
  async uploadCategoryImage(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<any> {
    if (!user) return new GraphQLError('Unauthorized');
    const path = `./uploads/${id}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return path;
  }

  @Query(() => [Category], { name: 'childCategories' })
  getAllChildren(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.categoryService.getAllChildren(id);
  }

  @Query(() => Category, { name: 'category' })
  findOne(@CurrentUser() user, @Args('id', { type: () => String }) id: string) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.categoryService.findOne(id);
  }
}
