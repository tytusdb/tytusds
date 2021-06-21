import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculardobleComponent } from './circulardoble.component';

describe('CirculardobleComponent', () => {
  let component: CirculardobleComponent;
  let fixture: ComponentFixture<CirculardobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CirculardobleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CirculardobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
