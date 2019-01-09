import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkstationComponent } from './edit-workstation.component';

describe('EditWorkstationComponent', () => {
  let component: EditWorkstationComponent;
  let fixture: ComponentFixture<EditWorkstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
