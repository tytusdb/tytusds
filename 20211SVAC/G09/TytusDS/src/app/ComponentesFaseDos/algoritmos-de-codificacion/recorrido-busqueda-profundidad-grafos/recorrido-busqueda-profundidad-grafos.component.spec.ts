import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoBusquedaProfundidadGrafosComponent } from './recorrido-busqueda-profundidad-grafos.component';

describe('RecorridoBusquedaProfundidadGrafosComponent', () => {
  let component: RecorridoBusquedaProfundidadGrafosComponent;
  let fixture: ComponentFixture<RecorridoBusquedaProfundidadGrafosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorridoBusquedaProfundidadGrafosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoBusquedaProfundidadGrafosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
