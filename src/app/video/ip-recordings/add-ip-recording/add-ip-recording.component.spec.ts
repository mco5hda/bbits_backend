import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIpRecordingComponent } from './add-ip-recording.component';

describe('AddIpRecordingComponent', () => {
  let component: AddIpRecordingComponent;
  let fixture: ComponentFixture<AddIpRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIpRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIpRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
