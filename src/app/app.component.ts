import { Component, OnInit, Injector } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { BaseComponent } from './_shared/components/base-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector,
    private _router: Router) {
    super(injector);
  }

  ngOnInit() {
    this._router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showProgress();
    }
    else if ( (event instanceof NavigationEnd) || (event instanceof NavigationCancel) || (event instanceof NavigationError) )  {
      this.stopProgress();
    }
  }
}
