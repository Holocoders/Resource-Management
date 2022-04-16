import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FacilityService } from './facility.service';
import { Facility } from './entities/facility.entity';
import { CreateFacilityInput } from './dto/create-facility.input';
import { UpdateFacilityInput } from './dto/update-facility.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { SharedService } from '../shared/shared.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../decorators/auth.decorator';
import { GraphQLError } from 'graphql';
import { AuthorizeNode } from 'src/decorators/metadata.decorator';

@Resolver(() => Facility)
@UseGuards(JwtAuthGuard, RolesGuard)
export class FacilityResolver {
  constructor(
    private readonly facilityService: FacilityService,
    private readonly sharedService: SharedService,
  ) {}

  @AuthorizeNode('createFacilityInput.parent')
  @Mutation(() => Facility)
  async createFacility(
    @CurrentUser() user,
    @Args('createFacilityInput') createFacilityInput: CreateFacilityInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    const facility = await this.facilityService.create(
      createFacilityInput,
      user._id,
    );
    const path = `./uploads/${facility.node['_id']}`;
    await this.sharedService.uploadImage(createReadStream, path);
    return facility;
  }

  @AuthorizeNode('id')
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

  @Query(() => [Facility], { name: 'facilitySearch' })
  search(@Args('name', { type: () => String }) name: string) {
    return this.facilityService.search(name);
  }

  @AuthorizeNode('updateFacilityInput._id')
  @Mutation(() => Facility)
  updateFacility(
    @Args('updateFacilityInput') updateFacilityInput: UpdateFacilityInput,
  ) {
    return this.facilityService.update(
      updateFacilityInput._id,
      updateFacilityInput,
    );
  }

  @AuthorizeNode('id')
  @Mutation(() => Facility)
  removeFacility(@Args('id', { type: () => String }) id: string) {
    return this.facilityService.remove(id);
  }
}
