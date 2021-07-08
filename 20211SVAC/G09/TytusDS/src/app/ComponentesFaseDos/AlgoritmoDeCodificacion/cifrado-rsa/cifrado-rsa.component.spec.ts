import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifradoRSAComponent } from './cifrado-rsa.component';

describe('CifradoRSAComponent', () => {
  let component: CifradoRSAComponent;
  let fixture: ComponentFixture<CifradoRSAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifradoRSAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifradoRSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
