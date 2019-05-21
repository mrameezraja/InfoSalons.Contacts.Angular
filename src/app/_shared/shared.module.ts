import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProcessButtonComponent } from './components/process-button/process-button.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { AuthGuard } from './gaurds/auth-gaurd';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StripeCardComponent } from './components/stripe-card/stripe-card.component';
import { IconComponent } from './components/icon/icon.component';
import { SessionService } from './services/session.service';
import { AccountService } from './services/account.service';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SettingService } from './abp-services/settings-service';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { NotifyService } from './abp-services/notify.service';


@NgModule({
    declarations: [
        NavBarComponent,
        ProcessButtonComponent,
        ErrorsComponent,
        SpinnerComponent,
        StripeCardComponent,
        IconComponent,
        LayoutComponent,
        ControlErrorComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,        
        BsDropdownModule.forRoot(),
        ModalModule.forRoot()
    ],
    exports: [
        NavBarComponent,
        ProcessButtonComponent,
        ErrorsComponent,
        StripeCardComponent,
        IconComponent,
        LayoutComponent,
        SpinnerComponent,
        ControlErrorComponent
    ],
    providers: [
        SettingService,   
        NotifyService,
        AccountService,
        AuthGuard]
})
export class SharedModule { }