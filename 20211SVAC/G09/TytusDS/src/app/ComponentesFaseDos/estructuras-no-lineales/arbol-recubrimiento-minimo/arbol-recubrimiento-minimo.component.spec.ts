import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolRecubrimientoMinimoComponent } from './arbol-recubrimiento-minimo.component';

describe('ArbolRecubrimientoMinimoComponent', () => {
  let component: ArbolRecubrimientoMinimoComponent;
  let fixture: ComponentFixture<ArbolRecubrimientoMinimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolRecubrimientoMinimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolRecubrimientoMinimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
