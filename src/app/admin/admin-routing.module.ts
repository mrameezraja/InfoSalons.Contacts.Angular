import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../_shared/gaurds/auth-gaurd';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: DashboardComponent
    },
    {
      path: 'users',
      canActivate: [AuthGuard],
      loadChildren: './users/users.module#UsersModule'
    },
    {
      path: 'roles',
      canActivate: [AuthGuard],
      loadChildren: './roles/roles.module#RolesModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
