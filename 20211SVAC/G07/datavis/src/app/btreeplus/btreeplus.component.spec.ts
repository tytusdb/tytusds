import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtreeplusComponent } from './btreeplus.component';

describe('BtreeplusComponent', () => {
  let component: BtreeplusComponent;
  let fixture: ComponentFixture<BtreeplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtreeplusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtreeplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
