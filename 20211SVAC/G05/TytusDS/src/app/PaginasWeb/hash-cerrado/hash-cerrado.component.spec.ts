import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashCerradoComponent } from './hash-cerrado.component';

describe('HashCerradoComponent', () => {
  let component: HashCerradoComponent;
  let fixture: ComponentFixture<HashCerradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashCerradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashCerradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
