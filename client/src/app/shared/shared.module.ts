import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SidebarModule } from 'primeng/sidebar';
import { UserModule } from '../user/user.module';
import {
  SuggestImagesComponent
} from './suggest-images/suggest-images.component';
import {
  NodeGridItemComponent
} from './node-grid-item/node-grid-item.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SuggestImagesComponent,
    NodeGridItemComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
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
    NodeGridItemComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
