import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruccionEstructurasCompuestasComponent } from './construccion-estructuras-compuestas.component';

describe('ConstruccionEstructurasCompuestasComponent', () => {
  let component: ConstruccionEstructurasCompuestasComponent;
  let fixture: ComponentFixture<ConstruccionEstructurasCompuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstruccionEstructurasCompuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstruccionEstructurasCompuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
