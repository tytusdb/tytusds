import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BplusComponent } from './bplus.component';

describe('BplusComponent', () => {
  let component: BplusComponent;
  let fixture: ComponentFixture<BplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BplusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
