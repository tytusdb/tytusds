import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoLZWComponent } from './algoritmo-lzw.component';

describe('AlgoritmoLZWComponent', () => {
  let component: AlgoritmoLZWComponent;
  let fixture: ComponentFixture<AlgoritmoLZWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoLZWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoLZWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
