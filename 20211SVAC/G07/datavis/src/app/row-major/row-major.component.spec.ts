import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowMajorComponent } from './row-major.component';

describe('RowMajorComponent', () => {
  let component: RowMajorComponent;
  let fixture: ComponentFixture<RowMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowMajorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
