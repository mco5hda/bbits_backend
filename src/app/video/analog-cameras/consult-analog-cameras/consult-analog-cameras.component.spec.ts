import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAnalogCamerasComponent } from './consult-analog-cameras.component';

describe('ConsultAnalogCamerasComponent', () => {
  let component: ConsultAnalogCamerasComponent;
  let fixture: ComponentFixture<ConsultAnalogCamerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultAnalogCamerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultAnalogCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
