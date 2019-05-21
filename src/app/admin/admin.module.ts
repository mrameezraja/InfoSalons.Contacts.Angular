import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  entryComponents: [AdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule    
  ]
})
export class AdminModule { }
