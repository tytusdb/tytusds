import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmosDeCodificacionComponent } from './algoritmos-de-codificacion.component';

describe('AlgoritmosDeCodificacionComponent', () => {
  let component: AlgoritmosDeCodificacionComponent;
  let fixture: ComponentFixture<AlgoritmosDeCodificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmosDeCodificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmosDeCodificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
