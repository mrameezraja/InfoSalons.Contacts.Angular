import { Injector } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AppConsts } from '../app-constants';
import { SettingService } from '../abp-services/settings-service';
import { NotifyService } from '../abp-services/notify.service';

declare let NProgress: any, abp: any;

export abstract class BaseComponent {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;
  
  public appSession: SessionService;
  public settings: SettingService;
  public notify: NotifyService;

  constructor(injector: Injector) {
    this.appSession = injector.get(SessionService);
    this.settings = injector.get(SettingService);
    this.notify = injector.get(NotifyService);
  }

  get isAdmin(): boolean {
    return this.isGranted("Pages.Admin") || this.isGranted("Pages.Users");
  }

  get languages() {
    return abp.localization.languages;
  }

  get currentLanguage() {
    return abp.localization.currentLanguage;
  }

  localize(key: string, sourceName: string) {
    return abp.localization.localize(key, sourceName);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localize(key, this.localizationSourceName);

    if (!localizedText) {
        localizedText = key;
    }

    if (!args || !args.length) {
        return localizedText;
    }

    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }
  
  isGranted(permissionName: string): boolean {
    return abp.auth.isGranted(permissionName);
  }

  get multiTenancyEnabled(): boolean {
    return abp.multiTenancy.isEnabled;
  }

  /*changeLanguage(languageName: string): void {
    const input = {new ChangeUserLanguageDto()};
    input.languageName = languageName;

    this._userService.changeLanguage(input).subscribe(() => {
        abp.utils.setCookieValue(
            'Abp.Localization.CultureName',
            languageName,
            new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
            abp.appPath
        );

        window.location.reload();
    });
  }*/

  showProgress() {
    NProgress.start();
  }

  stopProgress() {
    NProgress.done();
    NProgress.remove();
  }

  copyToClipboard(text: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (text));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }  

  confirm(message: string, callback: Function) {
    abp.message.confirm(
      message,
      callback
    );
  }
}