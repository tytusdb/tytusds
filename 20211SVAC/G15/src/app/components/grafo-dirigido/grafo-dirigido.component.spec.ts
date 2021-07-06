import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoDirigidoComponent } from './grafo-dirigido.component';

describe('GrafoDirigidoComponent', () => {
  let component: GrafoDirigidoComponent;
  let fixture: ComponentFixture<GrafoDirigidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafoDirigidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoDirigidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
