import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CifradofeisComponent } from './cifradofeis.component';

describe('CifradofeisComponent', () => {
  let component: CifradofeisComponent;
  let fixture: ComponentFixture<CifradofeisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CifradofeisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CifradofeisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
