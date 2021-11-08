import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AddItemComponent } from './add-item/add-item.component';
import {CategoryModule} from "../category/category.module";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ItemComponent, AddItemComponent],
  imports: [CommonModule, ItemRoutingModule, PrimengModule, CategoryModule, SharedModule, ReactiveFormsModule],
})
export class ItemModule {}
