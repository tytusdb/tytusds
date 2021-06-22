import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BstComponent } from './bst.component';

describe('BstComponent', () => {
  let component: BstComponent;
  let fixture: ComponentFixture<BstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
