import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_shared/layouts/layout/layout.component';
import { HomeComponent } from './public/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
