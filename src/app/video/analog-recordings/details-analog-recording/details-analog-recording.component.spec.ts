import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnalogRecordingComponent } from './details-analog-recording.component';

describe('DetailsAnalogRecordingComponent', () => {
  let component: DetailsAnalogRecordingComponent;
  let fixture: ComponentFixture<DetailsAnalogRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAnalogRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAnalogRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
