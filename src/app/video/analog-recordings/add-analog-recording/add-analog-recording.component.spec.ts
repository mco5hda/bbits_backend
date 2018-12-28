import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalogRecordingComponent } from './add-analog-recording.component';

describe('AddAnalogRecordingComponent', () => {
  let component: AddAnalogRecordingComponent;
  let fixture: ComponentFixture<AddAnalogRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnalogRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnalogRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
