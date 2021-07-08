import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifradoFeistelComponent } from './cifrado-feistel.component';

describe('CifradoFeistelComponent', () => {
  let component: CifradoFeistelComponent;
  let fixture: ComponentFixture<CifradoFeistelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifradoFeistelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CifradoFeistelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
