import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, ItemRoutingModule, PrimengModule],
})
export class ItemModule {}
