import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvlComponent } from './avl.component';

describe('AvlComponent', () => {
  let component: AvlComponent;
  let fixture: ComponentFixture<AvlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
