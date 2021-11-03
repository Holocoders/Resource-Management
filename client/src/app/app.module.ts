import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from './user/auth/auth-interceptor';
import { GraphQLModule } from './graphql.module';
import { FacilitiesComponent } from './facilities/facilities.component';
import { SharedModule } from "./shared/shared.module";
import { PrimengModule } from "./primeng/primeng.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, FacilitiesComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, GraphQLModule, HttpClientModule, SharedModule, PrimengModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
