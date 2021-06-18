import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDobleCircularComponent } from './lista-doble-circular.component';

describe('ListaDobleCircularComponent', () => {
  let component: ListaDobleCircularComponent;
  let fixture: ComponentFixture<ListaDobleCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDobleCircularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDobleCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
