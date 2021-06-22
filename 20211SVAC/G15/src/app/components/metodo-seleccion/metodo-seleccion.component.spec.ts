import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoSeleccionComponent } from './metodo-seleccion.component';

describe('MetodoSeleccionComponent', () => {
  let component: MetodoSeleccionComponent;
  let fixture: ComponentFixture<MetodoSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodoSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
