import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolMerkleComponent } from './arbol-merkle.component';

describe('ArbolMerkleComponent', () => {
  let component: ArbolMerkleComponent;
  let fixture: ComponentFixture<ArbolMerkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolMerkleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolMerkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
