import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item/item.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemHistoryComponent } from './item-history/item-history.component';
import { PackComponent } from './pack/pack.component';

@NgModule({
  declarations: [
    ItemComponent,
    ItemDetailComponent,
    ItemHistoryComponent,
    PackComponent,
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    PrimengModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService],
})
export class ItemModule {}
