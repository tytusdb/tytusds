import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkleComponent } from './merkle.component';

describe('MerkleComponent', () => {
  let component: MerkleComponent;
  let fixture: ComponentFixture<MerkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerkleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
