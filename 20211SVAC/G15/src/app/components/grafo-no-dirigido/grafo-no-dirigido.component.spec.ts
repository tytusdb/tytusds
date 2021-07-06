import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoNoDirigidoComponent } from './grafo-no-dirigido.component';

describe('GrafoNoDirigidoComponent', () => {
  let component: GrafoNoDirigidoComponent;
  let fixture: ComponentFixture<GrafoNoDirigidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafoNoDirigidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoNoDirigidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
