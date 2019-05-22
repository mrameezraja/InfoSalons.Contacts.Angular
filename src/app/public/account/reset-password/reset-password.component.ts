import { Component, OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AccountService } from 'src/app/_shared/services/account.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/_shared/components/base-component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  model: any = {
    code: "",
    password: "",
    confirmPassword: ""
  };
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
  
  resetPassword(): void {
    this.saving = true;
    let _url = new URL(location.href);
    this.model.code = _url.searchParams.get("code");
    this._accountService
      .resetPassword(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((result: any) => {
        this.notify.success('Password Changed Successfully');
        this._router.navigate(["/account/login"]);
      }, (err: any) => {
        this.errors = err.error.error;
      });
  }
}
