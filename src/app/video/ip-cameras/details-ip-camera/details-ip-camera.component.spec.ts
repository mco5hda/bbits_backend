import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsIpCameraComponent } from './details-ip-camera.component';

describe('DetailsIpCameraComponent', () => {
  let component: DetailsIpCameraComponent;
  let fixture: ComponentFixture<DetailsIpCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsIpCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsIpCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
