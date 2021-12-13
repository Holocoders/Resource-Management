import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './user/auth/auth-interceptor';
import { GraphQLModule } from './graphql.module';
import { FacilitiesComponent } from './facilities/facilities.component';
import { SharedModule } from './shared/shared.module';
import { PrimengModule } from './primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    AppComponent,
    FacilitiesComponent,
    MainComponent,
    BreadcrumbsComponent,
    ActivityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    PrimengModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
