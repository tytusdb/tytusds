import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDispersaComponent } from './mdispersa.component';

describe('MDispersaComponent', () => {
  let component: MDispersaComponent;
  let fixture: ComponentFixture<MDispersaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MDispersaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MDispersaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
