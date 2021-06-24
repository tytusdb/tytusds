import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructurasNoLinealesComponent } from './estructuras-no-lineales.component';

describe('EstructurasNoLinealesComponent', () => {
  let component: EstructurasNoLinealesComponent;
  let fixture: ComponentFixture<EstructurasNoLinealesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructurasNoLinealesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructurasNoLinealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
