import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoCostoUniformeComponent } from './algoritmo-costo-uniforme.component';

describe('AlgoritmoCostoUniformeComponent', () => {
  let component: AlgoritmoCostoUniformeComponent;
  let fixture: ComponentFixture<AlgoritmoCostoUniformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoCostoUniformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoCostoUniformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
