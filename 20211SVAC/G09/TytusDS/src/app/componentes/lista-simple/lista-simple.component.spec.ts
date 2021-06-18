import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSimpleComponent } from './lista-simple.component';

describe('ListaSimpleComponent', () => {
  let component: ListaSimpleComponent;
  let fixture: ComponentFixture<ListaSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
