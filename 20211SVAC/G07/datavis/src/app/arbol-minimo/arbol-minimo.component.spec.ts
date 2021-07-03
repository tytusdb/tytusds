import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolMinimoComponent } from './arbol-minimo.component';

describe('ArbolMinimoComponent', () => {
  let component: ArbolMinimoComponent;
  let fixture: ComponentFixture<ArbolMinimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolMinimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolMinimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
