import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class ContactsService extends BaseService {
    
    constructor(injector: Injector) {
        super(injector);
        this.resource = "api/services/app/Contacts";
    }

    getAllContacts(keyword: string | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): any{
        let url_ = this.resource + "/GetAll?";
        if (keyword !== undefined) {
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";    
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
