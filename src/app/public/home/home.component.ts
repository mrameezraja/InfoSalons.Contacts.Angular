import { Component, OnInit, Injector, OnDestroy, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/_shared/components/base-component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ContactsService } from 'src/app/_shared/services/contacts.service';
import { AppConsts } from 'src/app/_shared/app-constants';
import { BaseComponentPaging } from 'src/app/_shared/components/base-component-paging';
import { CreateContactComponent } from '../create-contact/create-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponentPaging implements AfterViewInit, OnDestroy {

  searchText: string = "";
  loading: boolean = false;
  rows = [];

  createScheduleModalRef: BsModalRef;
  editScheduleModalRef: BsModalRef;
  modalEventsSubscription: Subscription;

  constructor(injector: Injector,
    private _contactService: ContactsService,
    private _modalService: BsModalService) {
    super(injector);
  }

  ngAfterViewInit() {
    this.modalEventsSubscription = this._modalService.onHide.subscribe((e: any) => {
      // console.log(e);
      if (e !== AppConsts.cancelled) {
        this.refresh();
        var data = JSON.parse(e);
        if (data.action === AppConsts.created) {
          this.refresh();
        } else if (data.action === AppConsts.updated) {
          this.refresh();
        }
      }
    });
  }

  ngOnDestroy() {
    this.modalEventsSubscription.unsubscribe();
  }

  protected list(
    request: any,
    pageNumber: number,
    finishedCallback: Function
  ): void {
      this.loading = true;
      this._contactService
        .getAllContacts(this.searchText, request.skipCount, request.maxResultCount)
        .pipe(
          finalize(() => {
            this.loading = false;
            finishedCallback();
          })
        )
        .subscribe((response: any) => {
          this.rows = response.result.items;          
          this.showPaging(response.result, pageNumber);
        });
  }

  search() {
    this.refresh();
  }

  clearSearch() {
    this.searchText = "";
    this.refresh();
  }

  protected delete(webhook: any): void {
  }

  create(): void {
    this.createScheduleModalRef = this._modalService.show(CreateContactComponent, {
      animated: false,
      ignoreBackdropClick: true,
      class: "modal-md"
    });
  }

  edit(contact: any): void {
    this.editScheduleModalRef = this._modalService.show(EditContactComponent, {
      initialState: {
        contact: Object.assign({}, contact)
      },
      class: "modal-md",
      ignoreBackdropClick: true,
      animated: false
    });
  }


}
