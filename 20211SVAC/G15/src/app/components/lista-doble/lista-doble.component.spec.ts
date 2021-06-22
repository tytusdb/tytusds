import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDobleComponent } from './lista-doble.component';

describe('ListaDobleComponent', () => {
  let component: ListaDobleComponent;
  let fixture: ComponentFixture<ListaDobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDobleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
