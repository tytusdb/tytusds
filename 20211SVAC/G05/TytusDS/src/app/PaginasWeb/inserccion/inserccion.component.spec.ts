import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserccionComponent } from './inserccion.component';

describe('Inserccion', () => {
  let component: InserccionComponent;
  let fixture: ComponentFixture<InserccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
