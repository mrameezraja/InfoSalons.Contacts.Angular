import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_shared/services/users.service';
import { ParamsHelper } from 'src/app/_shared/helpers/params.helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  user: any = {};
  constructor(
    private _userService: UsersService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.parent.params.subscribe(params => {
      this._userService.get(+params["id"]).subscribe((response: any) => {        
        this.user = response.result;
      });
    });
  }

}
