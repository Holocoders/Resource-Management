import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CurrentUser } from 'src/decorators/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { GraphQLError } from 'graphql';
import { SharedService } from '../shared/shared.service';
import { join } from 'path';
import { AuthorizeNode } from 'src/decorators/metadata.decorator';
import { NodeType } from 'src/modules/node/entities/node.entity';
import { Category } from 'src/modules/category/entities/category.entity';

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
    const item = await this.itemService.createItem(createItemInput, user._id);
    const path = `./uploads/${item.node['_id']}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return item;
  }

  @AuthorizeNode('createItemInput.parent')
  @Mutation(() => Item)
  async createPack(
    @CurrentUser() user,
    @Args('createItemInput') createItemInput: CreateItemInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const item = await this.itemService.createPack(createItemInput, user._id);
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
  getAllItemChildren(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.getAllChildren(id, NodeType.ITEM);
  }

  @Query(() => [Item], { name: 'childPacks' })
  getAllPackChildren(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.getAllChildren(id, NodeType.PACK);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@CurrentUser() user, @Args('id', { type: () => String }) id: string) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.findById(id);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(@CurrentUser() user) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.itemService.findAll();
  }

  @Query(() => [Item], { name: 'itemSearch' })
  search(@Args('name', { type: () => String }) name: string) {
    return this.itemService.search(name);
  }

  @AuthorizeNode('updateItemInput._id')
  @Mutation(() => Item)
  async updateItem(
    @CurrentUser() user,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const path = `./uploads/${updateItemInput._id}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return this.itemService.update(updateItemInput._id, updateItemInput);
  }

  @AuthorizeNode('updateItemInput._id')
  @Mutation(() => Item)
  async updatePack(
    @CurrentUser() user,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const path = `./uploads/${updateItemInput._id}`;
    await this.sharedService.uploadImage(createReadStream, path);
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
