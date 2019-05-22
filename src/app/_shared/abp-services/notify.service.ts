import { Injectable } from '@angular/core';

// import { Noty } from '../../../../node_modules/noty/lib/noty.js';

declare let Noty: any;

@Injectable()
export class NotifyService {

    // https://ned.im/noty/#/

    position: string = "topRight";
    timeout: number = 2000;
    theme: string = "semanticui";

    noty(type: string, message: string, title?: string, options?: any) {
        new Noty({
            type: type,
            layout: this.position,
            timeout: this.timeout,
            theme: this.theme,
            text: message
        }).show();
    }

    info(message: string, title?: string, options?: any): void {
        this.noty('info', message, title, options);
    }

    success(message: string, title?: string, options?: any): void {
        this.noty('success', message, title, options);
    }

    warn(message: string, title?: string, options?: any): void {
        this.noty('warning', message, title, options);
    }

    error(message: string, title?: string, options?: any): void {
        this.noty('error', message, title, options);
    }

}