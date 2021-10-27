import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityResolver } from './facility.resolver';
import {Facility, FacilitySchema} from "./entities/facility.entity";
import { MongooseModule } from '@nestjs/mongoose';
import {NodeModule} from "../node/node.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Facility.name, schema: FacilitySchema }]),
    NodeModule
  ],
  providers: [FacilityResolver, FacilityService]
})
export class FacilityModule {}
