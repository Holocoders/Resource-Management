import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { NodeService } from '../node/node.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private nodeService: NodeService,
  ) {}

  async create(createCategoryInput: CreateCategoryInput, createdBy: string) {
    createCategoryInput._id = await this.nodeService.create(
      createCategoryInput.parent,
      createdBy,
    );
    return new this.categoryModel(createCategoryInput).save();
  }

  findAll() {
    return this.categoryModel.find();
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryInput as any);
  }

  async remove(id: string) {
    const path = `./uploads/${id}`;
    if (fs.existsSync(path)) fs.rmSync(path);
    await this.nodeService.remove(id);
    return this.categoryModel.findByIdAndRemove(id);
  }
}
