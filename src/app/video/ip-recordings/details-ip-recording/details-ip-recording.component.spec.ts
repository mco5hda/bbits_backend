import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsIpRecordingComponent } from './details-ip-recording.component';

describe('DetailsIpRecordingComponent', () => {
  let component: DetailsIpRecordingComponent;
  let fixture: ComponentFixture<DetailsIpRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsIpRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsIpRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
