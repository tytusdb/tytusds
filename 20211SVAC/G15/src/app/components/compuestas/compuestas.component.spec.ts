import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompuestasComponent } from './compuestas.component';

describe('CompuestasComponent', () => {
  let component: CompuestasComponent;
  let fixture: ComponentFixture<CompuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
