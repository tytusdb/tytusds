import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDobleEnlazadaComponent } from './lista-doble-enlazada.component';

describe('ListaDobleEnlazadaComponent', () => {
  let component: ListaDobleEnlazadaComponent;
  let fixture: ComponentFixture<ListaDobleEnlazadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDobleEnlazadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDobleEnlazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
