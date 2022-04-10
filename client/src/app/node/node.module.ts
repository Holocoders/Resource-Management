import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeComponent } from './node.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ItemModule } from '../item/item.module';
import { CategoryModule } from '../category/category.module';
import { NodeRoutingModule } from './node-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NodeUsersComponent } from './node-users/node-users.component';
import { NodeViewComponent } from './node-view/node-view.component';
import { UserModule } from '../user/user.module';
import { CreateUserComponent } from './node-users/create-user/create-user.component';

@NgModule({
  declarations: [
    NodeComponent,
    NodeUsersComponent,
    NodeViewComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    NodeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimengModule,
    ItemModule,
    CategoryModule,
    UserModule,
  ],
  exports: [CreateUserComponent],
})
export class NodeModule {}
