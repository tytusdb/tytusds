import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenamientoRapidoComponent } from './ordenamiento-rapido.component';

describe('OrdenamientoRapidoComponent', () => {
  let component: OrdenamientoRapidoComponent;
  let fixture: ComponentFixture<OrdenamientoRapidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenamientoRapidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenamientoRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
