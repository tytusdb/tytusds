import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RBProfundidadGrafosComponent } from './rbprofundidad-grafos.component';

describe('RBProfundidadGrafosComponent', () => {
  let component: RBProfundidadGrafosComponent;
  let fixture: ComponentFixture<RBProfundidadGrafosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RBProfundidadGrafosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RBProfundidadGrafosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
