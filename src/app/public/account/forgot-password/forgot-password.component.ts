import { Component, OnInit, Injector } from '@angular/core';
import { AccountService } from 'src/app/_shared/services/account.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/_shared/components/base-component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  model: any = { usernameOrEmail: "" };
  saving: boolean = false;
  errors: any = null;
  constructor(
    injector: Injector,
    private _accountService: AccountService,
    private _router: Router) { 
    super(injector);
  }

  ngOnInit() {

  }

  forgotPassword() {
    this.saving = true;
    this._accountService.forgotPassword(this.model).subscribe(() => {
      this.saving = false;
      this.notify.info("Please check your email to reset password.");
      this._router.navigate(['/account/login']);
    }, (err: any) => {
      this.errors = err.error.error;
      this.saving = false;
    });    
  }
}
