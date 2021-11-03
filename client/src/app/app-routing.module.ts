import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FacilitiesComponent} from "./facilities/facilities.component";

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule) },
  { path: 'facilities',component: FacilitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
