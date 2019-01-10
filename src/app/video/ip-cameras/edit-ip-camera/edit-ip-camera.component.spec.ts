import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIpCameraComponent } from './edit-ip-camera.component';

describe('EditIpCameraComponent', () => {
  let component: EditIpCameraComponent;
  let fixture: ComponentFixture<EditIpCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIpCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIpCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
