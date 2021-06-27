import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaComponent } from './cola.component';

describe('ColaComponent', () => {
  let component: ColaComponent;
  let fixture: ComponentFixture<ColaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
