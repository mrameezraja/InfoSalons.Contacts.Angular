import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-process-button',
  templateUrl: './process-button.component.html',
  styleUrls: ['./process-button.component.scss']
})
export class ProcessButtonComponent implements OnInit {
  @Input() isWorking: boolean = false;
  @Input() text: string = "Save";
  @Input() type: string = "btn-primary";
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {

  }

}
