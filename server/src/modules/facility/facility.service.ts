import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';
import { InjectModel } from '@nestjs/mongoose';
import { Facility, FacilityDocument } from './entities/facility.entity';
import { Model } from 'mongoose';
import { NodeService } from '../node/node.service';
import * as fs from 'fs';
import { Node, NodeType } from '../node/entities/node.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FacilityService {
  populateObject = [
    {
      path: '_id',
      model: Node.name,
      populate: {
        path: 'createdBy',
        model: User.name,
      },
    },
  ];

  constructor(
    @InjectModel(Facility.name) private facilityModel: Model<FacilityDocument>,
    @Inject(forwardRef(() => NodeService))
    private nodeService: NodeService,
  ) {}

  async create(createFacilityInput: CreateFacilityInput, createdBy: string) {
    createFacilityInput._id = await this.nodeService.create(
      null,
      createdBy,
      NodeType.FACILITY,
    );
    const createdFacility = new this.facilityModel(createFacilityInput);
    await createdFacility.save();
    await this.facilityModel.populate(createdFacility, this.populateObject);
    return createdFacility;
  }

  findAll() {
    return this.facilityModel.find();
  }

  findOne(id: string) {
    return this.facilityModel.findById(id);
  }

  update(id: string, updateFacilityInput: UpdateFacilityInput) {
    return this.facilityModel
      .findByIdAndUpdate(id, updateFacilityInput, {
        new: true,
      })
      .populate(this.populateObject);
  }

  remove(id: string) {
    const path = './uploads/' + id;
    if (fs.existsSync(path)) fs.rmSync(path);
    this.nodeService.remove(id);
    return this.facilityModel.findByIdAndRemove(id);
  }

  async deleteMany(ids: any[]) {
    for (const id of ids) fs.rmSync(`./uploads/${id}`, { force: true });
    return this.facilityModel.deleteMany({ _id: { $in: ids } });
  }

  async search(query: string) {
    return this.facilityModel.find({ name: { $regex: query, $options: 'i' } });
  }
}
