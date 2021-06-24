import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoBusquedaAnchuraGrafosComponent } from './recorrido-busqueda-anchura-grafos.component';

describe('RecorridoBusquedaAnchuraGrafosComponent', () => {
  let component: RecorridoBusquedaAnchuraGrafosComponent;
  let fixture: ComponentFixture<RecorridoBusquedaAnchuraGrafosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorridoBusquedaAnchuraGrafosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoBusquedaAnchuraGrafosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
