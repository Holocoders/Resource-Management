import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CurrentUser } from '../../decorators/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { GraphQLError } from 'graphql';
import { SharedService } from '../shared/shared.service';
import { join } from 'path';
import { AuthorizeNode } from '../../decorators/metadata.decorator';

@Resolver(() => Item)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly sharedService: SharedService,
  ) {}

  @AuthorizeNode('createItemInput.parent')
  @Mutation(() => Item)
  async createItem(
    @CurrentUser() user,
    @Args('createItemInput') createItemInput: CreateItemInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const item = await this.itemService.create(createItemInput, user._id);
    const path = `./uploads/${item.node['_id']}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return item;
  }

  @AuthorizeNode('id')
  @Mutation(() => String)
  async uploadItemImage(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<any> {
    if (!user) return new GraphQLError('Unauthorized');
    const path = `./uploads/${id}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return join(__dirname, path);
  }

  @Query(() => [Item], { name: 'childItems' })
  getAllChildren(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.getAllChildren(id);
  }

  @AuthorizeNode('id')
  @Query(() => Item, { name: 'item' })
  findOne(@CurrentUser() user, @Args('id', { type: () => String }) id: string) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.findOne(id);
  }

  @AuthorizeNode('updateItemInput._id')
  @Mutation(() => Item)
  updateItem(
    @CurrentUser() user,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.update(updateItemInput._id, updateItemInput);
  }

  @AuthorizeNode('id')
  @Mutation(() => Item)
  reduceQuantity(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
    @Args('reduceBy', { type: () => Int }) reduceBy: number,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.reduceQuantity(id, reduceBy);
  }
}
