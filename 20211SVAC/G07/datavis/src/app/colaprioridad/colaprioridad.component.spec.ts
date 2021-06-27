import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaprioridadComponent } from './colaprioridad.component';

describe('ColaprioridadComponent', () => {
  let component: ColaprioridadComponent;
  let fixture: ComponentFixture<ColaprioridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaprioridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaprioridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
