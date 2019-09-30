export class AppConsts {

  static remoteServiceBaseUrl: string = "http://localhost:21021";
    static appBaseUrl: string = "http://localhost:4200";
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static cancelled: string = "cancelled";
    static created: string = "created";
    static updated: string = "updated";

    static localeMappings: any = [
      {
        "from": "pt-BR",
        "to": "pt"
      },
      {
        "from": "zh-CN",
        "to": "zh"
      },
      {
        "from": "he-IL",
        "to": "he"
      }
    ];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'Shikral'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };
}
