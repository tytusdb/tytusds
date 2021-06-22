import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbComponent } from './abb.component';

describe('AbbComponent', () => {
  let component: AbbComponent;
  let fixture: ComponentFixture<AbbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
