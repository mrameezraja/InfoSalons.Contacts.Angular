import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/_shared/components/base-component';
import { StripeCardComponent } from 'src/app/_shared/components/stripe-card/stripe-card.component';
import { AccountService } from 'src/app/_shared/services/account.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent extends BaseComponent implements OnInit {
  @ViewChild('stripeCard') stripeCard: StripeCardComponent;
  saving: boolean = false;
  errors: any = {};

  subscription: any = {
    plan: "getting_started",
    token: "",
    brand: "",
    last4: ""
  };

  constructor(injector: Injector,
    private _accountService: AccountService) {
    super(injector);
  }

  ngOnInit() {
  }

  upgrade(): void {
    this.saving = true;
    this.stripeCard.createToken({ email: this.appSession.user.emailAddress }).then((result: any) => {
      if (result.error) {
        this.saving = false;
        //this.notify.error(this.l("UnableToCreatePayment"));
      } else {
        this.subscription.token = result.token.id;
        this.subscription.brand = result.token.card.brand;
        this.subscription.last4 = result.token.card.last4;
        this._accountService.upgradeSubscription(this.subscription)
          .pipe(
            finalize(() => {
              this.saving = false;
              this.errors = {};
            })
          )
          .subscribe((response: any) => {
            this.appSession.subscription = response.result;
          },
            (err: any) => {
              //this.notify.success(this.l('UpgradeSuccessfully'));
              this.errors = err.error.error;
            });
      }
    }, (err: any) => {
      //this.notify.error(this.l("UnableToCreatePayment"));
      this.saving = false;
    });
  }

  cancel() {
    this.notify.confirm(
      "Test",
      (result: boolean) => {
        if (result) {
          this.saving = true;
          this._accountService
            .cancelSubscription()
            .subscribe((response: any) => {
              this.appSession.subscription = response.result;
              this.saving = false;
            });
        }
      }
    );
  }

  get isDefault(): boolean {
    return this.appSession.subscription.name.toLowerCase() === "default";
  }
}
