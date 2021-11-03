import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AuthComponent } from "./auth/auth.component";
import { PrimengModule } from "../primeng/primeng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    PrimengModule,
    FormsModule
  ],
  exports: [
    AuthComponent
  ]
})
export class UserModule { }
