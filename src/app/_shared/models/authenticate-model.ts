export class AuthenticateModel {
    userNameOrEmailAddress: string;
    password: string;
    rememberClient: boolean | undefined;
    constructor() { }
}