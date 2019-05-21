import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from 'src/app/_shared/models/authenticate-model';
import { BaseComponent } from 'src/app/_shared/components/base-component';
import { AccountService } from 'src/app/_shared/services/account.service';
import { SessionService } from 'src/app/_shared/services/session.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_shared/services/login.service';

declare let abp: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticateModel: AuthenticateModel = new AuthenticateModel();
  working: boolean = false;
  errors: any = null;
  constructor(
    private _loginService: LoginService,
    private _sessionService: SessionService,
    private _router: Router) { 
    
    }

  ngOnInit() {
    if (this._sessionService.user) {
      this._router.navigate(['/home']);
    }
  }

  login() {
    this.working = true;
    this._loginService
      .authenticate(this.authenticateModel)
      .then((response: any) => {
        this.working = false;
        this._router.navigate(['/home']);
      }, (err) => {
          this.errors = err.error.error;
          this.working = false;
      });
  }


}
