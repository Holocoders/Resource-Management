import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { NodeService } from '../node/node.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import * as fs from 'fs';
import { Node, NodeType } from '../node/entities/node.entity';

@Injectable()
export class CategoryService {
  populateCategoryObject = {
    path: '_id',
    model: Node.name,
    populate: [
      {
        path: 'createdBy',
      },
      {
        path: 'parent',
      },
    ],
  };

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @Inject(forwardRef(() => NodeService))
    private nodeService: NodeService,
  ) {}

  async create(createCategoryInput: CreateCategoryInput, createdBy: string) {
    createCategoryInput._id = await this.nodeService.create(
      createCategoryInput.parent,
      createdBy,
      NodeType.CATEGORY,
    );
    const categoryDocument = await new this.categoryModel(
      createCategoryInput,
    ).save();
    await this.categoryModel.populate(
      categoryDocument,
      this.populateCategoryObject,
    );
    return categoryDocument;
  }

  async getAllChildren(id) {
    const nodes = await this.nodeService.findAllChildren(id, NodeType.CATEGORY);
    const categories = await this.categoryModel.find({ _id: { $in: nodes } });
    await this.categoryModel.populate(categories, this.populateCategoryObject);
    return categories;
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryInput as any,
      { new: true },
    );
  }

  async deleteMany(ids: any[]) {
    for (const id of ids) fs.rmSync(`./uploads/${id}`, { force: true });
    return this.categoryModel.deleteMany({ _id: { $in: ids } });
  }
}
