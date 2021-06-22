import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenamientoInsercionComponent } from './ordenamiento-insercion.component';

describe('OrdenamientoInsercionComponent', () => {
  let component: OrdenamientoInsercionComponent;
  let fixture: ComponentFixture<OrdenamientoInsercionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenamientoInsercionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenamientoInsercionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
