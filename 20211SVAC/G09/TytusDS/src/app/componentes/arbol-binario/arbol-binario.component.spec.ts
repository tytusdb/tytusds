import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolBinarioComponent } from './arbol-binario.component';

describe('ArbolBinarioComponent', () => {
  let component: ArbolBinarioComponent;
  let fixture: ComponentFixture<ArbolBinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolBinarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolBinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
