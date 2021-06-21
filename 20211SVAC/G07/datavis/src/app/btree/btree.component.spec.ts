import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtreeComponent } from './btree.component';

describe('BtreeComponent', () => {
  let component: BtreeComponent;
  let fixture: ComponentFixture<BtreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
