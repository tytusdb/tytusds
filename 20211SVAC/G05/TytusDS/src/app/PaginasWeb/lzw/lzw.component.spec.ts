import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LZWComponent } from './lzw.component';

describe('LZWComponent', () => {
  let component: LZWComponent;
  let fixture: ComponentFixture<LZWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LZWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LZWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
