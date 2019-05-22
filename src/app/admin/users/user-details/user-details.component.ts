import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamsHelper } from 'src/app/_shared/helpers/params.helper';

@Component({
  selector: 'app-user-details-layout',
  templateUrl: './user-details.component.html',
  styleUrls: []
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this._route.params.subscribe(params => {
      // ParamsHelper.currentUserId = +params['id'];
    // });
  }

}
