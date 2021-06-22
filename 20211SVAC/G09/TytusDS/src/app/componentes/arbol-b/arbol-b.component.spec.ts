import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolBComponent } from './arbol-b.component';

describe('ArbolBComponent', () => {
  let component: ArbolBComponent;
  let fixture: ComponentFixture<ArbolBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
