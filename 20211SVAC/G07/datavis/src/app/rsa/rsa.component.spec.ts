import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSAComponent } from './rsa.component';

describe('RSAComponent', () => {
  let component: RSAComponent;
  let fixture: ComponentFixture<RSAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RSAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
