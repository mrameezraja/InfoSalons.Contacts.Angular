import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AppConsts } from '../../app-constants';

declare let Stripe: any;

@Component({
  selector: 'app-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss']
})
export class StripeCardComponent implements OnInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Output() emit: EventEmitter<string> = new EventEmitter<string>();
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  stripe: any;
  elements: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.stripe = Stripe(AppConsts.stripeKey);
    this.elements = this.stripe.elements();
    this.bindCard();
  }

  bindCard() {
    const options = {
      hidePostalCode: true,
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };
    this.card = this.elements.create('card', options);
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  createToken(options?: any) {
    return this.stripe.createToken(this.card, options);
  }


  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

}
