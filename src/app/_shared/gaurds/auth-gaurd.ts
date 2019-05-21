import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        private _sessionService: SessionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this._sessionService.user) {
            this._router.navigate(['/login']);
            return false;
        }

        //if (!route.data || !route.data['permission']) {
            //return true;
        //}

        //this._router.navigate([this.selectBestRoute()]);
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        return '/servers';
    }
}
