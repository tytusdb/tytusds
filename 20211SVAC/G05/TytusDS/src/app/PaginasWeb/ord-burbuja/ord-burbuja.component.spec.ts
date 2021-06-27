import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdBurbujaComponent } from './ord-burbuja.component';

describe('OrdBurbujaComponent', () => {
  let component: OrdBurbujaComponent;
  let fixture: ComponentFixture<OrdBurbujaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdBurbujaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdBurbujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
