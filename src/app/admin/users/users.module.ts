import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { IndexComponent } from './index/index.component';
import { AgGridModule } from 'ag-grid-angular';
import { UsersService } from 'src/app/_shared/services/users.service';
import { SharedModule } from 'src/app/_shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [IndexComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    //AgGridModule.withComponents(null)
  ],
  providers: [UsersService, DatePipe]
})
export class UsersModule { }
