import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuComponent } from './cu.component';

describe('CuComponent', () => {
  let component: CuComponent;
  let fixture: ComponentFixture<CuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
