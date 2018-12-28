import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIpCameraComponent } from './add-ip-camera.component';

describe('AddIpCameraComponent', () => {
  let component: AddIpCameraComponent;
  let fixture: ComponentFixture<AddIpCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIpCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIpCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
