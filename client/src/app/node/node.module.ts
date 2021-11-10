import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NodeComponent} from './node.component';
import {SharedModule} from '../shared/shared.module';
import {PrimengModule} from '../primeng/primeng.module';
import {ItemModule} from '../item/item.module';
import {CategoryModule} from '../category/category.module';
import {NodeRoutingModule} from './node-routing.module';
import {AddCategoryComponent} from './add-category/add-category.component';
import {AddItemComponent} from './add-item/add-item.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AddCategoryComponent, AddItemComponent, NodeComponent],
  imports: [
    CommonModule,
    NodeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimengModule,
    ItemModule,
    CategoryModule,
  ],
})
export class NodeModule {
}
