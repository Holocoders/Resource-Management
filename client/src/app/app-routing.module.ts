import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacilitiesComponent } from './facilities/facilities.component';
import { AuthGuard } from './user/auth/auth.guard';
import { MainComponent } from './main/main.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  { path: '', redirectTo: '/facilities', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      { path: 'facilities', component: FacilitiesComponent },
      { path: 'activities', component: ActivityComponent },
      {
        path: 'item',
        loadChildren: () =>
          import('src/app/item/item.module').then((m) => m.ItemModule),
      },
      {
        path: 'pack',
        loadChildren: () =>
          import('src/app/item/item.module').then((m) => m.ItemModule),
      },
      {
        path: 'node',
        loadChildren: () =>
          import('src/app/node/node.module').then((m) => m.NodeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
