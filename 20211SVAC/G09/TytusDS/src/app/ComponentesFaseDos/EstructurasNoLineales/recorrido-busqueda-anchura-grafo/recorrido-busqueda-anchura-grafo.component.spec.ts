import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoBusquedaAnchuraGrafoComponent } from './recorrido-busqueda-anchura-grafo.component';

describe('RecorridoBusquedaAnchuraGrafoComponent', () => {
  let component: RecorridoBusquedaAnchuraGrafoComponent;
  let fixture: ComponentFixture<RecorridoBusquedaAnchuraGrafoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorridoBusquedaAnchuraGrafoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoBusquedaAnchuraGrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
