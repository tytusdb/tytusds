import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpComponent } from './cp.component';

describe('CpComponent', () => {
  let component: CpComponent;
  let fixture: ComponentFixture<CpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
