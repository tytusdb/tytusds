import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoBusquedaProfundidadGrafoComponent } from './recorrido-busqueda-profundidad-grafo.component';

describe('RecorridoBusquedaProfundidadGrafoComponent', () => {
  let component: RecorridoBusquedaProfundidadGrafoComponent;
  let fixture: ComponentFixture<RecorridoBusquedaProfundidadGrafoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorridoBusquedaProfundidadGrafoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoBusquedaProfundidadGrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
