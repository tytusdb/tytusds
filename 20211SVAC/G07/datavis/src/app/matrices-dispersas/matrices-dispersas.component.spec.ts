import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricesDispersasComponent } from './matrices-dispersas.component';

describe('MatricesDispersasComponent', () => {
  let component: MatricesDispersasComponent;
  let fixture: ComponentFixture<MatricesDispersasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatricesDispersasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatricesDispersasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
