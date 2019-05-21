import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/_shared/components/base-component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { generatePassword } from 'src/app/_shared/helpers/helpers';
import { finalize } from 'rxjs/operators';
import { UsersService } from 'src/app/_shared/services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {

  data: any;
  saving: boolean = false;
  errors: any = null;
  model: any = {
    password: "",
    userId: 0,
    adminPassword: ""
  };

  constructor(injector: Injector,
    public bsModalRef: BsModalRef,
    private _userService: UsersService) { 
    super(injector);
    }

  ngOnInit() {
    this.model.password = generatePassword();
  }

  updatePassword() {
    this.saving = true;
    this.errors = null;
    this.model.id = this.data.id;
    this._userService
      .updatePassword(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.bsModalRef.hide();
      }, (err: any) => {
        this.errors = err.error.error;
      });
  }

}
