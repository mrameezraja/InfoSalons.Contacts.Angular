import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from 'src/app/_shared/gaurds/auth-gaurd';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    {
      path: 'index',
      canActivate: [AuthGuard],
      component: IndexComponent
    },
    {
      path: 'details',
      canActivate: [AuthGuard],
      loadChildren: './user-details/user-details.module#UserDetailsModule'
    }
    // { path: 'create', component: RegisterComponent },
    // { path: 'edit/:id', component: ForgotPasswordComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
