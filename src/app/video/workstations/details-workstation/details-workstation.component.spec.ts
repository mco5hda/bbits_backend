import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWorkstationComponent } from './details-workstation.component';

describe('DetailsWorkstationComponent', () => {
  let component: DetailsWorkstationComponent;
  let fixture: ComponentFixture<DetailsWorkstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWorkstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
