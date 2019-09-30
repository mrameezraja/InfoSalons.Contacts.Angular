import { Component, OnInit, Injector } from '@angular/core';
import { ContactsService } from 'src/app/_shared/services/contacts.service';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppConsts } from 'src/app/_shared/app-constants';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  saving = false;
  errors: any = null;
  frmGroup: FormGroup;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _contactService: ContactsService,
    private _fb: FormBuilder
  ) {

    this.frmGroup = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      attendanceStatus: [true, Validators.required]
   });
  }

  ngOnInit() {

  }

  save(): void {
    
    /*if(!this.frmGroup.valid)
    {
      Object.keys(this.frmGroup.controls).forEach(field => { // {1}
        const control = this.frmGroup.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
      return;
    }*/

    this.saving = true;
    this.errors = null;
    this._contactService
      .create(this.frmGroup.value)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((res: any) => {
        this._modalService.setDismissReason(JSON.stringify({
          action: AppConsts.created,
          webhook: res.result
        }));
        this.bsModalRef.hide();
      }, (err: any) => {
        this.errors = err.error.error;          
      });
  }

  cancel() {
    this._modalService.setDismissReason(AppConsts.cancelled);
    this.bsModalRef.hide();
  }

}
