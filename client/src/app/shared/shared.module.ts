import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SidebarModule } from 'primeng/sidebar';
import { UserModule } from '../user/user.module';
import { SuggestImagesComponent } from './suggest-images/suggest-images.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './add-item/add-item.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NodeGridItemComponent } from './node-grid-item/node-grid-item.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SuggestImagesComponent,
    LoaderComponent,
    AddItemComponent,
    AddCategoryComponent,
    NodeGridItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    PrimengModule,
    SidebarModule,
    UserModule,
    FormsModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SuggestImagesComponent,
    LoaderComponent,
    AddItemComponent,
    AddCategoryComponent,
    NodeGridItemComponent,
  ],
})
export class SharedModule {}
