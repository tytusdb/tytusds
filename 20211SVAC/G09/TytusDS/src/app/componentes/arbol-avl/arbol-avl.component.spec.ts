import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolAvlComponent } from './arbol-avl.component';

describe('ArbolAvlComponent', () => {
  let component: ArbolAvlComponent;
  let fixture: ComponentFixture<ArbolAvlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolAvlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolAvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
