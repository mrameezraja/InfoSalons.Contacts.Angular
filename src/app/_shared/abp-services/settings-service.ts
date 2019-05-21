import { Injectable } from '@angular/core';

declare let abp: any;

@Injectable()
export class SettingService {
    constructor() { }
    
    get() {
        return abp.setting.get(name);
    }

    getBoolean() {
        return abp.setting.getBoolean(name);
    }

    getInt() {
        return abp.setting.getInt(name);
    }
}