import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalogCameraComponent } from './add-analog-camera.component';

describe('AddAnalogCameraComponent', () => {
  let component: AddAnalogCameraComponent;
  let fixture: ComponentFixture<AddAnalogCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnalogCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnalogCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
