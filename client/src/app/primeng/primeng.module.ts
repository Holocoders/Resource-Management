import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MultiSelectModule } from 'primeng/multiselect';
import { InplaceModule } from 'primeng/inplace';
import { BadgeModule } from 'primeng/badge';
import { AutoCompleteModule } from 'primeng/autocomplete';

const primeNgModules = [
  AvatarModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CheckboxModule,
  ChipModule,
  DataViewModule,
  DialogModule,
  DividerModule,
  FileUploadModule,
  ImageModule,
  InputNumberModule,
  InputTextareaModule,
  InputTextModule,
  MenubarModule,
  MenuModule,
  MessageModule,
  PanelModule,
  PasswordModule,
  RatingModule,
  RippleModule,
  SharedModule,
  TableModule,
  TabViewModule,
  TagModule,
  ToastModule,
  TooltipModule,
  ProgressSpinnerModule,
  CheckboxModule,
  ToolbarModule,
  ConfirmPopupModule,
  MultiSelectModule,
  InplaceModule,
  BadgeModule,
  AutoCompleteModule,
];

@NgModule({
  imports: primeNgModules,
  exports: primeNgModules,
})
export class PrimengModule {}
