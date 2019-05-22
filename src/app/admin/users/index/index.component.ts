import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponentPaging } from 'src/app/_shared/components/base-component-paging';
import { finalize } from 'rxjs/operators';
import { UsersService } from 'src/app/_shared/services/users.service';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ParamsHelper } from 'src/app/_shared/helpers/params.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseComponentPaging {
  searchText: string = "";
  loading: boolean = false;
  updatePasswordModalRef: BsModalRef;

  constructor(injector: Injector,
    private _userService: UsersService,
    private _modalService: BsModalService,
    private _router: Router,
    private _datePipe: DatePipe) {
    super(injector);
  }

  // https://stackoverflow.com/questions/47338347/ag-grid-server-side-pagination

  columnDefs = [
    { headerName: 'Id', field: 'id', width: 78 },
    { headerName: 'Name', field: 'name', width: 170, cellRenderer: (params: any) => `<a href="#" routerLink='details'>${params.value}</a>` },
    { headerName: 'Email Address', field: 'emailAddress', width: 250 },
    { headerName: 'Is Paid', width: 80, field: 'cardLastFour', valueFormatter: (params: any) => (params.value !== "" || params.value !== null) },
    { headerName: 'Last Login Time', field: 'lastLoginTime', width: 170, valueFormatter: (params: any) => this._datePipe.transform(params.value, "medium") },
    { headerName: 'Creation Time', field: 'creationTime', width: 170, valueFormatter: (params: any) => this._datePipe.transform(params.value, "medium") }
  ];

  rows = [];

  protected list(
    request: any,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.loading = true;    
    this._userService
      .getAllUsers(this.searchText, request.isActive, request.from, request.to, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((response: any) => {
        this.rows = response.result.items;
        this.loading = false;
        this.showPaging(response.result, pageNumber);
      });
  }

  protected delete(user: any): void {
    /*abp.message.confirm(
      // this.l('UserDeleteWarningMessage', user.fullName),
      (result: boolean) => {
        if (result) {
          this._userService.delete(user.id).subscribe(() => {
            //abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );*/
  }

  search() {
    this.refresh();
  }

  clearSearch() {
    this.searchText = "";
    this.refresh();
  }

  isPaid(u: any): string {
    return (u.cardLastFour !== null) ? `<span class="badge badge-pill badge-success">Paid</span>` : `<span class="badge badge-pill badge-info">Free</span>`;
  }

  updatePassword(item: any) {
    this.updatePasswordModalRef = this._modalService.show(ResetPasswordComponent, {
      initialState: {
        data: item
      },
      animated: false
    });
  }

  navigate(u: any) {
    ParamsHelper.currentUserId = u.id;
    this._router.navigate(['/admin/users/details', u.id]);
  }

}
