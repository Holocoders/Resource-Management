import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FacilityService } from './facility.service';
import { Facility } from './entities/facility.entity';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';

@Resolver(() => Facility)
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService) {}

  @Mutation(() => Facility)
  createFacility(@Args('createFacilityInput') createFacilityInput: CreateFacilityInput) {
    return this.facilityService.create(createFacilityInput);
  }

  @Query(() => [Facility], { name: 'facilities' })
  findAll() {
    return this.facilityService.findAll();
  }

  @Query(() => Facility, { name: 'facility' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.facilityService.findOne(id);
  }

  @Mutation(() => Facility)
  updateFacility(@Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput) {
    return this.facilityService.update(updateFacilityInput._id, updateFacilityInput);
  }

  @Mutation(() => Facility)
  removeFacility(@Args('id', { type: () => String }) id: string) {
    return this.facilityService.remove(id);
  }
}
