import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIpRecordingComponent } from './edit-ip-recording.component';

describe('EditIpRecordingComponent', () => {
  let component: EditIpRecordingComponent;
  let fixture: ComponentFixture<EditIpRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIpRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIpRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
