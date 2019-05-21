import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class UsersService extends BaseService {
    
    constructor(injector: Injector) {
        super(injector);
        this.resource = "/api/services/app/user";
    }

    getAllUsers(keyword: string | null | undefined, isActive: boolean | null | undefined, from: null | undefined, to: null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): any{
        let url_ = this.resource + "/GetAll?";
        if (keyword !== undefined) {
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";    
        }            
        
        if (isActive !== undefined) {
            url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
        }
        
        if (from !== undefined) {
            // url_ += "From=" + encodeURIComponent(from ? "" + from.toJSON() : "") + "&";    
        }            

        if (to !== undefined) {
            // url_ += "To=" + encodeURIComponent(to ? "" + to.toJSON() : "") + "&";     
        }
        
        if (skipCount !== undefined) {
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";             
        }
            
        if (maxResultCount !== undefined) {
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";    
        }            
        
        url_ = url_.replace(/[?&]$/, "");

        return this._apiService.get(url_);
    }

    updatePassword(input: any) {
        return this._apiService.put(`${this.resource}/ResetPassword`, input);
    }
}
