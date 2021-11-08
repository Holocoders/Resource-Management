import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SidebarModule } from 'primeng/sidebar';
import { UserModule } from '../user/user.module';
import { SuggestImagesComponent } from './suggest-images/suggest-images.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, SuggestImagesComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PrimengModule,
    SidebarModule,
    UserModule,
  ],
  exports: [NavbarComponent, SidebarComponent, SuggestImagesComponent],
})
export class SharedModule {}
