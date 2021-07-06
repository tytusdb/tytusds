import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuffmanComponent } from './huffman.component';

describe('HuffmanComponent', () => {
  let component: HuffmanComponent;
  let fixture: ComponentFixture<HuffmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuffmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuffmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
