import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoCodificacionComponent } from './algoritmo-codificacion.component';

describe('AlgoritmoCodificacionComponent', () => {
  let component: AlgoritmoCodificacionComponent;
  let fixture: ComponentFixture<AlgoritmoCodificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoCodificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoCodificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
