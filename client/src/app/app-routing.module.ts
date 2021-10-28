import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FacilitiesComponent} from "./facilities/facilities.component";

const routes: Routes = [
  { path: '', redirectTo: '/facilities', pathMatch: 'full' },
  { path: 'facilities',component: FacilitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
