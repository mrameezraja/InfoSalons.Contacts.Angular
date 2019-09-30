import { Injectable } from '@angular/core';
import { ApplicationInfo } from '../models/application-info';
import { UserLoginInfo } from '../models/user-login-info';
import { GetCurrentLoginInformationsOutput } from '../models/current-login-informtion';
import { AccountService } from './account.service';
import { SubscriptionDto } from '../models/subscription';
import { AppConsts } from '../app-constants';

declare let abp: any, $: any;

@Injectable()
export class SessionService {

    private _user: UserLoginInfo;
    private _tenant: any;
    private _application: ApplicationInfo;
    private _subscription: SubscriptionDto;
    private _metaData: Object = {};

    constructor(private _accountService: AccountService) {
    }

    get application(): ApplicationInfo {
        return this._application;
    }

    get user(): UserLoginInfo {
        return this._user;
    }

    get userId(): number {
        return this.user ? this.user.id : null;
    }

    get tenant(): any {
        return this._tenant;
    }

    get tenantId(): number {
        return this.tenant ? this.tenant.id : null;
    }

    get subscription(): SubscriptionDto {
        return this._subscription;
    }

    set subscription(value: SubscriptionDto) {
        this._subscription = value;
    }

    get metaData(): Object {
        return this._metaData;
    }

    set metaData(value: Object) {
        this._metaData = value;
    }    

    getShownLoginName(): string {
        return this._user.name;
    }

    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._accountService.getCurrentLoginInformations()
                .toPromise()
                .then((response: any) => {
                    let result = response.result;
                    this._application = result.application;
                    this._user = result.user;
                    this._tenant = result.tenant;
                    
                    resolve(true);
                }, (err) => {
                    reject(err);
                });
        });
    }

    changeTenantIfNeeded(tenantId?: number): boolean {
        if (this.isCurrentTenant(tenantId)) {
            return false;
        }
        location.reload();
        return true;
    }

    private isCurrentTenant(tenantId?: number) {
        if (!tenantId && this.tenant) {
            return false;
        } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }
        return true;
    }

    getCurrentClockProvider(currentProviderName: string): any {
        if (currentProviderName === "unspecifiedClockProvider") {
            return abp.timing.unspecifiedClockProvider;
        }
      
        if (currentProviderName === "utcClockProvider") {
            return abp.timing.utcClockProvider;
        }
      
        return abp.timing.localClockProvider;
      }
}
