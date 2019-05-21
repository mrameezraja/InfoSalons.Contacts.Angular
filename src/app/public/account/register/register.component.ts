import { Component, OnInit, Injector } from '@angular/core';
import { AccountService } from 'src/app/_shared/services/account.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/_shared/services/login.service';
import { AuthenticateModel } from 'src/app/_shared/models/authenticate-model';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationHelper } from 'src/app/_shared/helpers/validation-helper';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let acPassword = AC.get('password');
    let acCPassword = AC.get('confirmPassword');
    if (acPassword && acCPassword) {
      let password = acPassword.value;
      let confirmPassword = acPassword.value;
      if (confirmPassword != "" && password != confirmPassword) {
        acCPassword.setErrors({ MatchPassword: true })
      } else {
        return null;
      }
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model: RegisterInput = new RegisterInput();
  saving: boolean = false;
  form: FormGroup;
  errors: any = [];

  constructor(injector: Injector,
    private _accountService: AccountService,
    private _loginService: LoginService,
    private _router: Router,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      emailAddress: ['', [Validators.required, ValidationHelper.emailValidator, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required, PasswordValidation.MatchPassword]]
    });
  }

  save(): void {
    this.saving = true;
    this.model.name = this.model.surname = this.form.controls.name.value;
    this.model.userName = this.model.emailAddress = this.form.controls.emailAddress.value;
    this.model.password = this.form.controls.password.value;
    this._accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          // this.saving = false;
        })
      )
      .subscribe((response: any) => {
        if (!response.result.canLogin) {
          this._router.navigate(["/account/login"]);
          return;
        }
        //Autheticate
        this.saving = true;
        let input = new AuthenticateModel();
        input.userNameOrEmailAddress = this.model.userName;
        input.password = this.model.password;
        this._loginService.authenticate(input).then(() => {
          this.saving = false;
          this._router.navigate(['/home']);
        });
      }, (err: any) => {
        this.errors = err.error.error;
        this.saving = false;
      });
  }

}

export class RegisterInput {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
  captchaResponse: string | undefined;
}