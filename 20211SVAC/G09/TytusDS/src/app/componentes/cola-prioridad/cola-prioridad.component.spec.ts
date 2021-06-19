import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaPrioridadComponent } from './cola-prioridad.component';

describe('ColaPrioridadComponent', () => {
  let component: ColaPrioridadComponent;
  let fixture: ComponentFixture<ColaPrioridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaPrioridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaPrioridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
