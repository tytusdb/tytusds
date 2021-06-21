import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenamientoSeleccionComponent } from './ordenamiento-seleccion.component';

describe('OrdenamientoSeleccionComponent', () => {
  let component: OrdenamientoSeleccionComponent;
  let fixture: ComponentFixture<OrdenamientoSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenamientoSeleccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenamientoSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
