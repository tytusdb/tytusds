import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraCompuestaComponent } from './estructura-compuesta.component';

describe('EstructuraCompuestaComponent', () => {
  let component: EstructuraCompuestaComponent;
  let fixture: ComponentFixture<EstructuraCompuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraCompuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraCompuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
