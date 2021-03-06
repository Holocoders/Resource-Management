import { forwardRef, Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityResolver } from './facility.resolver';
import { Facility, FacilitySchema } from './entities/facility.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeModule } from '../node/node.module';
import { SharedModule } from '../shared/shared.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Facility.name, schema: FacilitySchema },
    ]),
    forwardRef(() => NodeModule),
    forwardRef(() => PermissionModule),
    SharedModule,
  ],
  providers: [FacilityResolver, FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
