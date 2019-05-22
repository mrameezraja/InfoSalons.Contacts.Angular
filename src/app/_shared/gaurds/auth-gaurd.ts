import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { SessionService } from '../services/session.service';

declare let abp: any;

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

        if (!route.data || !route.data["permission"]) {
            return true;
        }

        //console.log("isGranted: %s, permission: %s", this._permissionChecker.isGranted(route.data["permission"]), route.data["permission"]);

        if (!abp.auth.isGranted(route.data["permission"])) {
            return false;
        }

        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {
        return '/servers';
    }
}
