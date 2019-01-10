import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultIpCamerasComponent } from './consult-ip-cameras.component';

describe('ConsultIpCamerasComponent', () => {
  let component: ConsultIpCamerasComponent;
  let fixture: ComponentFixture<ConsultIpCamerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultIpCamerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultIpCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
