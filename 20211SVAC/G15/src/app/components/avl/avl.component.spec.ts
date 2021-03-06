import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AVLComponent } from './avl.component';

describe('AVLComponent', () => {
  let component: AVLComponent;
  let fixture: ComponentFixture<AVLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AVLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AVLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
