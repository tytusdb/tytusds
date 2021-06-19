import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABinarioComponent } from './a-binario.component';

describe('ABinarioComponent', () => {
  let component: ABinarioComponent;
  let fixture: ComponentFixture<ABinarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABinarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ABinarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
