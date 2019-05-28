import { ApiService } from './api.service';
import { Injector } from '@angular/core';

export class BaseService {
    private _resource: string;
    public _apiService: ApiService;
    constructor(injector: Injector) {
        this._apiService = injector.get(ApiService);
    }

    get resource(): string {
        return this._resource;
    }

    set resource(value: string) {
        this._resource = value;
    }

    getAll(skipCount: number, maxResultCount: number) {
        let url_ = this.resource + "/GetAll?";
        if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");
        return this._apiService.get(url_);
    }

    create(input: any) {
        return this._apiService.post(`${this.resource}/create`, input);
    }

    get(id: number) {
        return this._apiService.get(`${this.resource}/get`, { id: id });
    }

    update(input: any) {
        return this._apiService.get(`${this.resource}/Update`, input);
    }

    delete(id: number) {
        let url_ = this.resource + "/Delete?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        return this._apiService.delete(url_);
    }
}
