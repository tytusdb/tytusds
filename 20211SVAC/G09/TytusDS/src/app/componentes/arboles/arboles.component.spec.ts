import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolesComponent } from './arboles.component';

describe('ArbolesComponent', () => {
  let component: ArbolesComponent;
  let fixture: ComponentFixture<ArbolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
