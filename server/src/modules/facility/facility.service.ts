import {Injectable} from '@nestjs/common';
import {CreateFacilityInput} from './dto/create-facility.input';
import {UpdateFacilityInput} from './dto/update-facility.input';
import {InjectModel} from '@nestjs/mongoose';
import {Facility, FacilityDocument} from './entities/facility.entity';
import {Model} from 'mongoose';
import {NodeService} from '../node/node.service';
import * as fs from 'fs';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility.name) private facilityModel: Model<FacilityDocument>,
    private nodeService: NodeService,
  ) {}

  async create(createFacilityInput: CreateFacilityInput) {
    createFacilityInput._id = await this.nodeService.create(null);
    const createdFacility = new this.facilityModel(createFacilityInput);
    return createdFacility.save();
  }

  findAll() {
    return this.facilityModel.find();
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
    fs.unlink(path, () => {
      this.nodeService.remove(id);
    });
    return this.facilityModel.findByIdAndRemove(id);
  }
}
