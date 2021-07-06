import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashAbiertoComponent } from './hash-abierto.component';

describe('HashAbiertoComponent', () => {
  let component: HashAbiertoComponent;
  let fixture: ComponentFixture<HashAbiertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashAbiertoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashAbiertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
