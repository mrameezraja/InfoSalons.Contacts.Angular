import { Component, OnInit, Injector } from '@angular/core';
import { ContactsService } from 'src/app/_shared/services/contacts.service';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppConsts } from 'src/app/_shared/app-constants';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  saving = false;
  contact: any = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    attendanceStatus: true
  };
  errors: any = null;
  frmGroup: FormGroup;

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _contactService: ContactsService,
    private _fb: FormBuilder
  ) {
    
  }

  ngOnInit() {
    this.frmGroup = this._fb.group({
      firstName: [this.contact.firstName, Validators.required],
      lastName: [this.contact.lastName, Validators.required],
      company: [this.contact.company, Validators.required],
      jobTitle: [this.contact.jobTitle, Validators.required],
      email: [this.contact.email, Validators.email],
      phone: [this.contact.phone, Validators.required],
      attendanceStatus: [this.contact.attendanceStatus, Validators.required]
   });
  }

  save(): void {
    this.saving = true;
    this.errors = null;
    this.frmGroup.value.id = this.contact.id;
    this._contactService
      .update(this.frmGroup.value)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((res: any) => {
        this._modalService.setDismissReason(JSON.stringify({
          action: AppConsts.updated,
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
