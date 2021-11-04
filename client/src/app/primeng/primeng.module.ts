import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from "primeng/ripple";
import { AvatarModule } from "primeng/avatar";
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { CheckboxModule } from "primeng/checkbox";
import { ToastModule } from "primeng/toast";
import { PanelModule } from "primeng/panel";
import { MessageModule } from "primeng/message";

const primeNgModules = [
  MenubarModule,
  SharedModule,
  ButtonModule,
  ImageModule,
  InputTextModule,
  RippleModule,
  AvatarModule,
  DialogModule,
  PasswordModule,
  DividerModule,
  CheckboxModule,
  ToastModule,
  PanelModule,
  MessageModule
]

@NgModule({
  imports: primeNgModules,
  exports: primeNgModules
})
export class PrimengModule {
}
