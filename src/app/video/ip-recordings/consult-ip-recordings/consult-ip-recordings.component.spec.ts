import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultIpRecordingsComponent } from './consult-ip-recordings.component';

describe('ConsultIpRecordingsComponent', () => {
  let component: ConsultIpRecordingsComponent;
  let fixture: ComponentFixture<ConsultIpRecordingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultIpRecordingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultIpRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
