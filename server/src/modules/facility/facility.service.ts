import { Injectable } from '@nestjs/common';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';
import {InjectModel} from "@nestjs/mongoose";
import {Facility, FacilityDocument} from "./entities/facility.entity";
import {Model} from "mongoose";

@Injectable()
export class FacilityService {

  constructor(
    @InjectModel(Facility.name) private facilityModel: Model<FacilityDocument>
  ) {}

  create(createFacilityInput: CreateFacilityInput) {
    const createdFacility = new this.facilityModel(createFacilityInput);
    return createdFacility.save();
  }

  findAll() {
    return this.facilityModel.find({}).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} facility`;
  }

  update(id: number, updateFacilityInput: UpdateFacilityInput) {
    return `This action updates a #${id} facility`;
  }

  remove(id: number) {
    return `This action removes a #${id} facility`;
  }
}
