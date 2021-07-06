import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuranolinealesComponent } from './estructuranolineales.component';

describe('EstructuranolinealesComponent', () => {
  let component: EstructuranolinealesComponent;
  let fixture: ComponentFixture<EstructuranolinealesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuranolinealesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuranolinealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
