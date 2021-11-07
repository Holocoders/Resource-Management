import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FacilityService } from './facility.service';
import { Facility } from './entities/facility.entity';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { SharedService } from '../shared/shared.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../decorators/auth.decorator';

@Resolver(() => Facility)
@UseGuards(JwtAuthGuard)
export class FacilityResolver {
  constructor(
    private readonly facilityService: FacilityService,
    private readonly sharedService: SharedService,
  ) {}

  @Mutation(() => Facility)
  async createFacility(
    @CurrentUser() user,
    @Args('createFacilityInput') createFacilityInput: CreateFacilityInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    const facility = await this.facilityService.create(
      createFacilityInput,
      user._id,
    );
    const path = `./uploads/${facility._id._id}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return facility;
  }

  @Mutation(() => Boolean)
  async uploadFacilityImage(
    @Args('id', { type: () => String }) id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<boolean> {
    const path = `./uploads/${id}`;
    return this.sharedService.uploadImage(createReadStream, path);
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
  updateFacility(
    @Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput,
  ) {
    return this.facilityService.update(
      updateFacilityInput._id,
      updateFacilityInput,
    );
  }

  @Mutation(() => Facility)
  removeFacility(@Args('id', { type: () => String }) id: string) {
    return this.facilityService.remove(id);
  }
}
