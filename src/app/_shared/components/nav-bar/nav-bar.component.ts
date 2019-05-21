import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../base-component';
import { AppConsts } from '../../app-constants';

declare let abp: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }

  logout() {
    abp.auth.clearToken();
    abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, undefined, undefined, abp.appPath);
    this.appSession = null;
    location.href = "/";
  }

}
