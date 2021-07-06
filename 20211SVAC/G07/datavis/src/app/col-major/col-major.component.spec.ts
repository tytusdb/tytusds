import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColMajorComponent } from './col-major.component';

describe('ColMajorComponent', () => {
  let component: ColMajorComponent;
  let fixture: ComponentFixture<ColMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColMajorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
