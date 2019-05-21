import { Component, Injector } from '@angular/core';
import { RoleService } from 'src/app/_shared/services/roles.service';
import { finalize } from 'rxjs/operators';
import { BaseComponentPaging } from 'src/app/_shared/components/base-component-paging';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseComponentPaging {

  loading: boolean = false;
  constructor(injector: Injector,
    private _roleService: RoleService) {
    super(injector);
  }

  rows = [];

  protected list(
    request: any,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    this.loading = true;
    this._roleService
      .getAll(request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((response: any) => {
        this.rows = response.result.items;
        this.loading = false;
      });
  }

  protected delete(item: any): void {
    
  }

}
