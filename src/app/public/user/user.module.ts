import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    SubscriptionComponent
  ],
  entryComponents: [UserComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,    
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class UserModule { }
