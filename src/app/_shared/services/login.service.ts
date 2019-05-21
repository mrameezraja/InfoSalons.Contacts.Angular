import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthenticateModel } from '../models/authenticate-model';
import { SessionService } from './session.service';

declare let abp: any;

@Injectable()
export class LoginService {

    resource: string = "/api/TokenAuth/Authenticate";
    constructor(
        private _apiService: ApiService,
        private _sessionService: SessionService) {

    }

    login(input: AuthenticateModel) {
        return this._apiService.post(this.resource, input);
    }

    authenticate(input: AuthenticateModel) {
        return new Promise((resolve, reject) => {
            this.login(input).subscribe((response: any) => {
                if (response.success) {
                    const tokenExpireDate = input.rememberClient ? (new Date(new Date().getTime() + 1000 * response.result.expireInSeconds)) : undefined;

                    abp.auth.setToken(
                        response.result.accessToken,
                        tokenExpireDate
                    );

                    abp.utils.setCookieValue(
                        "enc_auth_token",
                        response.result.encryptedAccessToken,
                        tokenExpireDate,
                        abp.appPath
                    );

                    this._sessionService.init().then(resolve, reject);
                }
            }, reject);
        });
    }
}