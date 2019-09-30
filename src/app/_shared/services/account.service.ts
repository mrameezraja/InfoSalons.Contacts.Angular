import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConsts } from '../app-constants';
import { AuthenticateModel } from '../models/authenticate-model';

declare var abp: any;
@Injectable()
export class AccountService {    
    constructor(private _apiService: ApiService) {

    }

    register(input: any) {
        return this._apiService.post("/api/services/app/Account/Register", input);
    }

    getCurrentLoginInformations() {
        return this._apiService.get('/api/services/app/Session/GetCurrentLoginInformations');
    }

    logout(reload?: boolean): void {
        abp.auth.clearToken();
		abp.utils.setCookieValue(AppConsts.authorization.encrptedAuthTokenName, undefined, undefined, abp.appPath);
        if (reload !== false) {
            location.href = "/";
        }
    }

    changePassword(currentPassword: string, newPassword: string){
        return this._apiService.post('/api/services/app/user/ChangePassword', {
            currentPassword,
            newPassword
        });
    }

    updateInfo(name: string) {
        return this._apiService.put('/api/services/app/user/UpdateInfo', {
            name
        });
    }

    upgradeSubscription(input: any) {
        return this._apiService.post('/api/services/app/Subscription/Upgrade', input);
    }

    cancelSubscription(input: any = {}) {
        return this._apiService.post('/api/services/app/Subscription/Cancel', input);
    }

    forgotPassword(input: any) {
        return this._apiService.post('/api/services/app/Account/ForgotPassword', input);
    }

    resetPassword(input: any) {
        return this._apiService.post('/api/services/app/Account/ResetPassword', input);
    }

}
