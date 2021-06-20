import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCircularSimpleComponent } from './lista-circular-simple.component';

describe('ListaCircularSimpleComponent', () => {
  let component: ListaCircularSimpleComponent;
  let fixture: ComponentFixture<ListaCircularSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCircularSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCircularSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
