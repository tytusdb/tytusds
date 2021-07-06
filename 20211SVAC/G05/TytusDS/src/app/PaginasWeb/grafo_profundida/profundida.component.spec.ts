import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfundidaComponent } from './profundida.component';

describe('ProfundidaComponent', () => {
  let component: ProfundidaComponent;
  let fixture: ComponentFixture<ProfundidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfundidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfundidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
