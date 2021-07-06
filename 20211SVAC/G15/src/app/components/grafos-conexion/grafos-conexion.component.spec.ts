import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafosConexionComponent } from './grafos-conexion.component';

describe('GrafosConexionComponent', () => {
  let component: GrafosConexionComponent;
  let fixture: ComponentFixture<GrafosConexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafosConexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafosConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
