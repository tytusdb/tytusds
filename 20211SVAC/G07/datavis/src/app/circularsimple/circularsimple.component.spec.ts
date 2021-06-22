import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularsimpleComponent } from './circularsimple.component';

describe('CircularsimpleComponent', () => {
  let component: CircularsimpleComponent;
  let fixture: ComponentFixture<CircularsimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularsimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularsimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
