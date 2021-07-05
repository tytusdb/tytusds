import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructurasCompuestasComponent } from './estructuras-compuestas.component';

describe('EstructurasCompuestasComponent', () => {
  let component: EstructurasCompuestasComponent;
  let fixture: ComponentFixture<EstructurasCompuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructurasCompuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructurasCompuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
