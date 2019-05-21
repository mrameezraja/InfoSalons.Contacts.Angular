import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessButtonComponent } from './process-button.component';

describe('ProcessButtonComponent', () => {
  let component: ProcessButtonComponent;
  let fixture: ComponentFixture<ProcessButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
