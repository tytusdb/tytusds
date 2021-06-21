import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficarComponent } from './graficar.component';

describe('GraficarComponent', () => {
  let component: GraficarComponent;
  let fixture: ComponentFixture<GraficarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
