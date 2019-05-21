import { ApplicationInfo } from './application-info';
import { UserLoginInfo } from './user-login-info';
import { SubscriptionDto } from './subscription';

export class GetCurrentLoginInformationsOutput {
    application: ApplicationInfo | undefined;
    user: UserLoginInfo | undefined;
    tenant: any | undefined;
    subscription: SubscriptionDto | undefined;
    metaData: { [key: string]: string; } | undefined;
    constructor() { }
}