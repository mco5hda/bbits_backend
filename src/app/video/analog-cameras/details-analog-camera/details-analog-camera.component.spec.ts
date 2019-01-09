import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnalogCameraComponent } from './details-analog-camera.component';

describe('DetailsAnalogCameraComponent', () => {
  let component: DetailsAnalogCameraComponent;
  let fixture: ComponentFixture<DetailsAnalogCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAnalogCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAnalogCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
