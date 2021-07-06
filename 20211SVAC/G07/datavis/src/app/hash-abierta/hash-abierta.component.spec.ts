import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashAbiertaComponent } from './hash-abierta.component';

describe('HashAbiertaComponent', () => {
  let component: HashAbiertaComponent;
  let fixture: ComponentFixture<HashAbiertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashAbiertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
