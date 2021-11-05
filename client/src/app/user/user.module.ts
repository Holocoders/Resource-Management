import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AuthComponent } from "./auth/auth.component";
import { PrimengModule } from "../primeng/primeng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import { MessageService } from "primeng/api";
import { SigninComponent } from './signin/signin.component';
import {LocalMessageService} from "../shared/local-message.service";


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    PrimengModule,
    FormsModule,
  ],
  exports: [
    AuthComponent,
    SignupComponent
  ],
  providers: [
    MessageService
  ]
})
export class UserModule {
}
