import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoHammingComponent } from './codigo-hamming.component';

describe('CodigoHammingComponent', () => {
  let component: CodigoHammingComponent;
  let fixture: ComponentFixture<CodigoHammingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigoHammingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoHammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
