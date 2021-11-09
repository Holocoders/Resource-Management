import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateCategoryInput} from './dto/create-category.input';
import {UpdateCategoryInput} from './dto/update-category.input';
import {NodeService} from '../node/node.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Category, CategoryDocument} from './entities/category.entity';
import * as fs from "fs";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @Inject(forwardRef(() => NodeService))
    private nodeService: NodeService,
  ) {}

  populateCategoryObject = {
    path: '_id',
    populate: [
      {
        path: 'createdBy'
      },
      {
        path: 'parent'
      }
    ]
  }

  async create(createCategoryInput: CreateCategoryInput, createdBy: string) {
    createCategoryInput._id = await this.nodeService.create(
      createCategoryInput.parent, createdBy
    );
    const categoryDoc = await new this.categoryModel(createCategoryInput).save();
    await this.categoryModel.populate(categoryDoc, this.populateCategoryObject);
    return categoryDoc;
  }

  async getAllChildren(id) {
    const nodes = await this.nodeService.findAllChildren(id, false);
    const categories = await this.categoryModel.find({_id: {$in: nodes}});
    await this.categoryModel.populate(categories, this.populateCategoryObject);
    return categories;
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryInput as any
    );
  }

  async deleteMany(ids: any[]) {
    for (const id of ids)
      fs.rmSync(`./uploads/${id}`, {force: true});
    return this.categoryModel.deleteMany({_id: {$in: ids}});
  }
}
