import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAccessoriesComponent } from './consult-accessories.component';

describe('ConsultAccessoriesComponent', () => {
  let component: ConsultAccessoriesComponent;
  let fixture: ComponentFixture<ConsultAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
