import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompuestaComponent } from './compuesta.component';

describe('CompuestaComponent', () => {
  let component: CompuestaComponent;
  let fixture: ComponentFixture<CompuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
