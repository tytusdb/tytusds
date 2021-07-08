import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraNoLinealComponent } from './estructura-no-lineal.component';

describe('EstructuraNoLinealComponent', () => {
  let component: EstructuraNoLinealComponent;
  let fixture: ComponentFixture<EstructuraNoLinealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraNoLinealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraNoLinealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
