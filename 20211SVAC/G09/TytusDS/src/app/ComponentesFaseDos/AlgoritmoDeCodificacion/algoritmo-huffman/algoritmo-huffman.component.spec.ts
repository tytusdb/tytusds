import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoHuffmanComponent } from './algoritmo-huffman.component';

describe('AlgoritmoHuffmanComponent', () => {
  let component: AlgoritmoHuffmanComponent;
  let fixture: ComponentFixture<AlgoritmoHuffmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoHuffmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoHuffmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
