import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAnalogRecordingsComponent } from './consult-analog-recordings.component';

describe('ConsultAnalogRecordingsComponent', () => {
  let component: ConsultAnalogRecordingsComponent;
  let fixture: ComponentFixture<ConsultAnalogRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultAnalogRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultAnalogRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
