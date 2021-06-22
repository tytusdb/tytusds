import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadobleComponent } from './listadoble.component';

describe('ListadobleComponent', () => {
  let component: ListadobleComponent;
  let fixture: ComponentFixture<ListadobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadobleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
