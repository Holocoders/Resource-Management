import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimengModule } from "../primeng/primeng.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidebarModule } from "primeng/sidebar";
import { UserModule } from "../user/user.module";


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedRoutingModule,
    PrimengModule,
    SidebarModule,
    UserModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule {
}
