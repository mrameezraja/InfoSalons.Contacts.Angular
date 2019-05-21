import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConsts } from '../app-constants';

interface StringMap {
  [key: string]: string;
}

export interface RequestConfig {
  method: string;
  url: string;
  params?: StringMap;
  headers?: StringMap;
  body?: any;
}

declare var abp: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = AppConsts.remoteServiceBaseUrl;
  private http: HttpClient;
  static headers: HttpHeaders;
  constructor(
    @Inject(HttpClient) http: HttpClient
  ) {
    this.http = http;
  }

  getHeaders() {
    let headers = new HttpHeaders()
      .append('Authorization', `Bearer ${abp.auth.getToken()}`)
      .append('.AspNetCore.Culture', `Bearer ${abp.utils.getCookieValue('Abp.Localization.CultureName')}`)
      .append('Abp.TenantId', `Bearer ${abp.multiTenancy.getTenantIdCookie()}`);
    return headers;
  }

  /*
  public getAccount() : Observable<Account> {
        var stream = this.apiClient.makeRequest<Account>({
            method: "GET",
            url: "./api/account.json"
        });
        return( stream );
    }

this.apiService.getAccount().subscribe(
  ( account ) => {
  
  });

    <ng-template [ngIf]="( ! account )">
            <p>
                <em>Loading....</em>
            </p>
        </ng-template>
        <ng-template [ngIf]="account">
            <h2>
                Welcome {{ account.name }}
            </h2>
            <p>
                I'm Johnny Cab - where can I take you tonight?
            </p>
        </ng-template>
  */
  public makeRequest<T>(requestConfig: RequestConfig): Observable<T> {

    // The point of having a specialized API HttpClient is that you can bake-in logic
    // that is specific to this API, but not necessarily needed for any other
    // HttpClient in the application. There is a LOT you can do with this pattern;
    // but, for the PURPOSES OF THIS DEMO, we're only going to be sending the current
    // browser's timezone offset (in minutes).
    var headers: StringMap = {
      ...requestConfig.headers,

      // Pass the timezone offset as a special HTTP header. This way, the server
      // can record this value if it has been changed (based on the user's locale).
      'Authorization': `Bearer ${abp.auth.getToken()}`,
      '.AspNetCore.Culture': `Bearer ${abp.utils.getCookieValue('Abp.Localization.CultureName')}`,
      'Abp.TenantId': `Bearer ${abp.multiTenancy.getTenantIdCookie()}`
    };

    var httpStream = this.http.request<T>(
      requestConfig.method,
      requestConfig.url,
      {
        responseType: "json",
        headers: headers,
        params: requestConfig.params
      }
    );

    return (httpStream);
  }

  get(endpoint: string, params?: any, options?: any) {
    if (!options) {
      options = {};
    }
    if (params) {
      let p = new HttpParams();
      for (let k in params) {
        p = p.append(k, params[k]);
      }
      options.params = p || options.search;
    }
    
    options.headers = this.getHeaders();
    return <Observable<any>>this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: any) {
    if (!options) {
      options = {};
    }
    
    options.headers = this.getHeaders();
    return <Observable<any>>this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: any) {
    if (!options) {
      options = {};
    }

    options.headers = this.getHeaders();
    return <Observable<any>>this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: any) {
    if (!options) {
      options = {};
    }

    options.headers = this.getHeaders();
    return <Observable<any>>this.http.delete(this.url + '/' + endpoint, options);
  }

}
