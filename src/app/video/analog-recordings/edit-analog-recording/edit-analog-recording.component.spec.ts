import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnalogRecordingComponent } from './edit-analog-recording.component';

describe('EditAnalogRecordingComponent', () => {
  let component: EditAnalogRecordingComponent;
  let fixture: ComponentFixture<EditAnalogRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnalogRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnalogRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
