import { Injectable } from '@nestjs/common';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';

@Injectable()
export class FacilityService {
  create(createFacilityInput: CreateFacilityInput) {
    return 'This action adds a new facility';
  }

  findAll() {
    return `This action returns all facility`;
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
