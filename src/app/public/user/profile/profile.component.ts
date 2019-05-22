import { Component, OnInit, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BaseComponent } from 'src/app/_shared/components/base-component';
import { AccountService } from 'src/app/_shared/services/account.service';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
     let password = AC.get('newPassword').value; 
     let confirmPassword = AC.get('confirmPassword').value;
      if(password != confirmPassword) {          
          AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
        return null;
      }
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  saving: boolean = false;
  updating: boolean = false;
  profile: any = { name: "", email: "", errors: null };
  passwordModel: any = { errors: null };
  form: FormGroup;
  constructor(injector: Injector,
    private _accountService: AccountService,
    private fb: FormBuilder) {
    super(injector);
    
  }

  ngOnInit() {    
    this.form = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
      });
    
    this.profile.name = this.appSession.getShownLoginName();
    this.profile.email = this.appSession.user.emailAddress;
  }

  updateProfile() {
    this.saving = true;
    this.profile.errors = null;
    this._accountService
      .updateInfo(this.profile.name)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      ).subscribe(() => {
        this.appSession.user.name = this.profile.name;
        this.notify.success("Profile Updated");
      }, (err) => {
        this.profile.errors = err.error.error;
      });
  }

  updatePassword() {
    this.passwordModel.errors = null;
    this.updating = true;
    this._accountService
      .changePassword(this.form.controls.currentPassword.value, this.form.controls.newPassword.value)
      .pipe(
        finalize(() => {
          this.updating = false;
        })
    ).subscribe(() => {
      this.notify.success("Password Updated");
      }, (err) => {
        this.passwordModel.errors = err.error.error;
      });
  }

}
