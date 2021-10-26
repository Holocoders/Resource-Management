import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityResolver } from './facility.resolver';

@Module({
  providers: [FacilityResolver, FacilityService]
})
export class FacilityModule {}
