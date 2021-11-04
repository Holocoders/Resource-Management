import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilitiesComponent } from "./facilities/facilities.component";
import { AuthGuard } from "./user/auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/facilities', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule) },
  { path: 'facilities', component: FacilitiesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
