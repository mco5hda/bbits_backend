import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultLicensesComponent } from './consult-licenses.component';

describe('ConsultLicensesComponent', () => {
  let component: ConsultLicensesComponent;
  let fixture: ComponentFixture<ConsultLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
