import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import {PrimengModule} from "../primeng/primeng.module";

@NgModule({
    declarations: [
        AddCategoryComponent
    ],
    imports: [
      CommonModule,
      CategoryRoutingModule,
      PrimengModule
    ],
    exports: [
        AddCategoryComponent
    ]
})
export class CategoryModule {}
