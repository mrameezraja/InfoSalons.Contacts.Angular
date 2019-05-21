import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/_shared/components/base-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }

}
