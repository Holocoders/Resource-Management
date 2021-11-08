import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';
import { InjectModel } from '@nestjs/mongoose';
import { Facility, FacilityDocument } from './entities/facility.entity';
import { Model } from 'mongoose';
import { NodeService } from '../node/node.service';
import * as fs from 'fs';
import { Item } from '../item/entities/item.entity';
import { Node } from '../node/entities/node.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility.name) private facilityModel: Model<FacilityDocument>,
    @Inject(forwardRef(() => NodeService))
    private nodeService: NodeService,
  ) {}

  async create(createFacilityInput: CreateFacilityInput, createdBy: string) {
    createFacilityInput._id = await this.nodeService.create(null, createdBy);
    const createdFacility = new this.facilityModel(createFacilityInput);
    createdFacility.save();
    await this.facilityModel.populate(createdFacility, {
      path: '_id',
      populate: {
        path: 'createdBy',
        model: User.name,
      },
    });
    await this.facilityModel.populate(createdFacility, 'userId');
    return createdFacility;
  }

  findAll() {
    return this.facilityModel.find().populate({
      path: '_id',
      populate: {
        path: 'createdBy',
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} facility`;
  }

  update(id: string, updateFacilityInput: UpdateFacilityInput) {
    return this.facilityModel.findByIdAndUpdate(id, updateFacilityInput, {
      new: true,
    });
  }

  remove(id: string) {
    const path = './uploads/' + id;
    if (fs.existsSync(path)) fs.rmSync(path);
    this.nodeService.remove(id);
    return this.facilityModel.findByIdAndRemove(id);
  }

  async deleteMany(ids: any[]) {
    for (const id of ids)
      fs.rmSync(`./uploads/${id}`, {force: true});
    return this.facilityModel.deleteMany({_id: {$in: ids}});
  }
}
