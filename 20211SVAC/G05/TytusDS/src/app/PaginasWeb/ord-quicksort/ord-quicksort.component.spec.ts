import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdQuicksortComponent } from './ord-quicksort.component';

describe('OrdQuicksortComponent', () => {
  let component: OrdQuicksortComponent;
  let fixture: ComponentFixture<OrdQuicksortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdQuicksortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdQuicksortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
