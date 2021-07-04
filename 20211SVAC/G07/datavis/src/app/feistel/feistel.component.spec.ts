import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeistelComponent } from './feistel.component';

describe('FeistelComponent', () => {
  let component: FeistelComponent;
  let fixture: ComponentFixture<FeistelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeistelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeistelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
