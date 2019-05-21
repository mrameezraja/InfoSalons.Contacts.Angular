import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { SharedModule } from './_shared/shared.module';
import { SessionService } from './_shared/services/session.service';
import { PlatformLocation } from '@angular/common';
import { AppConsts } from './_shared/app-constants';

export function getBaseHref(platformLocation: PlatformLocation): string {
  var baseUrl = platformLocation.getBaseHrefFromDOM();
  if (baseUrl) {
      return baseUrl;
  }
  return '/';
}

export function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {
  return () => {
    AppConsts.appBaseHref = getBaseHref(platformLocation);
    const appSessionService: SessionService = injector.get(SessionService); 
    return appSessionService.init(); 
  };  
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
