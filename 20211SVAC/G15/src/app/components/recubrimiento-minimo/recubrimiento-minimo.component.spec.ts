import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecubrimientoMinimoComponent } from './recubrimiento-minimo.component';

describe('RecubrimientoMinimoComponent', () => {
  let component: RecubrimientoMinimoComponent;
  let fixture: ComponentFixture<RecubrimientoMinimoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecubrimientoMinimoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecubrimientoMinimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
