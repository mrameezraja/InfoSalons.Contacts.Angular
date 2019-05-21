import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { RoleService } from 'src/app/_shared/services/roles.service';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule
  ],
  providers: [RoleService]
})
export class RolesModule { }
