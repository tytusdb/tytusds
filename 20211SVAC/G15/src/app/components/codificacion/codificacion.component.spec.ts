import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodificacionComponent } from './codificacion.component';

describe('CodificacionComponent', () => {
  let component: CodificacionComponent;
  let fixture: ComponentFixture<CodificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
