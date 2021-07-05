import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HammingComponent } from './hamming.component';

describe('HammingComponent', () => {
  let component: HammingComponent;
  let fixture: ComponentFixture<HammingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HammingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
