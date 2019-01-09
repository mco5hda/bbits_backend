import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultWorkstationsComponent } from './consult-workstations.component';

describe('ConsultWorkstationsComponent', () => {
  let component: ConsultWorkstationsComponent;
  let fixture: ComponentFixture<ConsultWorkstationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultWorkstationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultWorkstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
