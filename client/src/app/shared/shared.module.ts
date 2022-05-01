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
import { AddPackComponent } from './add-pack/add-pack.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditProfilePicComponent } from 'src/app/shared/sidebar/edit-profile-pic.component';
import { AddFacilityComponent } from 'src/app/shared/add-facility/add-facility.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    EditProfilePicComponent,
    SuggestImagesComponent,
    LoaderComponent,
    AddItemComponent,
    AddCategoryComponent,
    NodeGridItemComponent,
    AddPackComponent,
    AddFacilityComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    PrimengModule,
    SidebarModule,
    UserModule,
    FormsModule,
    ImageCropperModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SuggestImagesComponent,
    LoaderComponent,
    AddItemComponent,
    AddCategoryComponent,
    NodeGridItemComponent,
    AddPackComponent,
    AddFacilityComponent,
  ],
})
export class SharedModule {}
