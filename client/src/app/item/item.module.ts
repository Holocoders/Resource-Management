import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { PrimengModule } from '../primeng/primeng.module';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [ItemComponent],
    imports: [CommonModule, ItemRoutingModule, PrimengModule, SharedModule, ReactiveFormsModule]
})
export class ItemModule {}
