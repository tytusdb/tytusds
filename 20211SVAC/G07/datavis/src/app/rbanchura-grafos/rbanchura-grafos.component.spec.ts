import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RBAnchuraGrafosComponent } from './rbanchura-grafos.component';

describe('RBAnchuraGrafosComponent', () => {
  let component: RBAnchuraGrafosComponent;
  let fixture: ComponentFixture<RBAnchuraGrafosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RBAnchuraGrafosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RBAnchuraGrafosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
