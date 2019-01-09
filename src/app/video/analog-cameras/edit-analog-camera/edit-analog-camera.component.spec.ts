import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnalogCameraComponent } from './edit-analog-camera.component';

describe('EditAnalogCameraComponent', () => {
  let component: EditAnalogCameraComponent;
  let fixture: ComponentFixture<EditAnalogCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnalogCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnalogCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
