import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructurasLinealesComponent } from './estructuras-lineales.component';

describe('EstructurasLinealesComponent', () => {
  let component: EstructurasLinealesComponent;
  let fixture: ComponentFixture<EstructurasLinealesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructurasLinealesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructurasLinealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
