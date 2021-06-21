import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsercionComponent } from './insercion.component';

describe('InsercionComponent', () => {
  let component: InsercionComponent;
  let fixture: ComponentFixture<InsercionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsercionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsercionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
