import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class RoleService extends BaseService {
    
    constructor(injector: Injector) {
        super(injector);
        this.resource = "/api/services/app/role";
    }
}
