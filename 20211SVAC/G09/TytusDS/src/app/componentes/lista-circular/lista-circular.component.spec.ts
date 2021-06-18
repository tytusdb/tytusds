import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCircularComponent } from './lista-circular.component';

describe('ListaCircularComponent', () => {
  let component: ListaCircularComponent;
  let fixture: ComponentFixture<ListaCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCircularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
