import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenamientoBurbujaComponent } from './ordenamiento-burbuja.component';

describe('OrdenamientoBurbujaComponent', () => {
  let component: OrdenamientoBurbujaComponent;
  let fixture: ComponentFixture<OrdenamientoBurbujaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenamientoBurbujaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenamientoBurbujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
