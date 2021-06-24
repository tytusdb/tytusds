import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoDeCostoUniformeComponent } from './algoritmo-de-costo-uniforme.component';

describe('AlgoritmoDeCostoUniformeComponent', () => {
  let component: AlgoritmoDeCostoUniformeComponent;
  let fixture: ComponentFixture<AlgoritmoDeCostoUniformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoDeCostoUniformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoDeCostoUniformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
