import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LBSTComponent } from './l-bst.component';

describe('LBSTComponent', () => {
  let component: LBSTComponent;
  let fixture: ComponentFixture<LBSTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LBSTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LBSTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
