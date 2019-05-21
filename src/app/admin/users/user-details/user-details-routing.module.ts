import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_shared/gaurds/auth-gaurd';
import { IndexComponent } from './index/index.component';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [{
  path: ':id',
  component: UserDetailsComponent,
  children: [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    {
      path: 'index',
      canActivate: [AuthGuard],
      component: IndexComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }
