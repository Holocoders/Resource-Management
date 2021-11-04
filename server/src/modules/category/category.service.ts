import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { NodeService } from "../node/node.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "./entities/category.entity";

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private nodeService: NodeService
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    createCategoryInput._id = await this.nodeService.create(createCategoryInput.parent);
    return new this.categoryModel(createCategoryInput).save();
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
