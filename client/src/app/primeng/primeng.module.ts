import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from "primeng/ripple";
import { AvatarModule } from "primeng/avatar";

const primeNgModules = [
  MenubarModule,
  SharedModule,
  ButtonModule,
  ImageModule,
  InputTextModule,
  RippleModule,
  AvatarModule
]

@NgModule({
  imports: primeNgModules,
  exports: primeNgModules
})
export class PrimengModule {
}
