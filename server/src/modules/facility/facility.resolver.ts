import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FacilityService } from './facility.service';
import { Facility } from './entities/facility.entity';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver(() => Facility)
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService) {}

  @Mutation(() => Facility)
  async createFacility(
    @Args('createFacilityInput') createFacilityInput: CreateFacilityInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ) {
    const facility = await this.facilityService.create(createFacilityInput);
    const id = facility._id;
    const ext = filename.split('.').pop();
    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${id}.${ext}`))
        .on('finish', () => {
          resolve(true);
        })
        .on('error', () => reject(false)),
    );
    return facility;
  }

  @Mutation(() => Boolean)
  async uploadImage(
    @Args('id', { type: () => String }) id: string,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    const ext = filename.split('.').pop();
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${id}.${ext}`))
        .on('finish', () => {
          resolve(true);
        })
        .on('error', () => reject(false)),
    );
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
