import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ItemService} from './item.service';
import {Item} from './entities/item.entity';
import {CreateItemInput} from './dto/create-item.input';
import {UpdateItemInput} from './dto/update-item.input';
import {createWriteStream} from "fs";
import {FileUpload, GraphQLUpload} from "graphql-upload";

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ) {
    const item = await this.itemService.create(createItemInput);
    const id = item._id;
    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${id}`))
        .on('finish', () => {
          resolve(true);
        })
        .on('error', () => reject(false)),
    );
    return item;
  }

  @Mutation(() => String)
  async uploadItemImage(
    @Args('id', { type: () => String }) id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
      { createReadStream, filename }: FileUpload,
  ): Promise<any> {
    const path = `./uploads/${id}`;
    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => {
          resolve(true);
        })
        .on('error', () => reject(false)),
    );
    return {image: path};
  }

  @Query(() => [Item], { name: 'item' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => String }) id: string) {
    return this.itemService.remove(id);
  }
}
