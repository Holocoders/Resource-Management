import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthInterceptor } from './users/auth-interceptor';

@NgModule({
  declarations: [AppComponent, SidebarComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
