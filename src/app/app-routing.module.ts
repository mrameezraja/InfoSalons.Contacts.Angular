import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './public/account/account.module';
import { LayoutComponent } from './_shared/layouts/layout/layout.component';
import { HomeComponent } from './public/home/home.component';
import { AuthGuard } from './_shared/gaurds/auth-gaurd';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => AccountModule //'./public/account/account.module#AccountModule'
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: './public/user/user.module#UserModule'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  // { path: '**', redirectTo: '/account/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
