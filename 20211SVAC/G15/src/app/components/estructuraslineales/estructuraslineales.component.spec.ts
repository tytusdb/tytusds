import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraslinealesComponent } from './estructuraslineales.component';

describe('EstructuraslinealesComponent', () => {
  let component: EstructuraslinealesComponent;
  let fixture: ComponentFixture<EstructuraslinealesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraslinealesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraslinealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
