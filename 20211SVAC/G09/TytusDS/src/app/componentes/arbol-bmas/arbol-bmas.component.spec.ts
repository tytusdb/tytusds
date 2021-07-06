import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolBMasComponent } from './arbol-bmas.component';

describe('ArbolBMasComponent', () => {
  let component: ArbolBMasComponent;
  let fixture: ComponentFixture<ArbolBMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolBMasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolBMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
