import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasCicularesDEComponent } from './listas-ciculares-de.component';

describe('ListasCicularesDEComponent', () => {
  let component: ListasCicularesDEComponent;
  let fixture: ComponentFixture<ListasCicularesDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasCicularesDEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasCicularesDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
