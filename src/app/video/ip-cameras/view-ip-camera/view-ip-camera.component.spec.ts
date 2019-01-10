import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIpCameraComponent } from './view-ip-camera.component';

describe('ViewIpCameraComponent', () => {
  let component: ViewIpCameraComponent;
  let fixture: ComponentFixture<ViewIpCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIpCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIpCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
