import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoUniformeComponent } from './costo-uniforme.component';

describe('CostoUniformeComponent', () => {
  let component: CostoUniformeComponent;
  let fixture: ComponentFixture<CostoUniformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostoUniformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoUniformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
