import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashCerradaComponent } from './hash-cerrada.component';

describe('HashCerradaComponent', () => {
  let component: HashCerradaComponent;
  let fixture: ComponentFixture<HashCerradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashCerradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashCerradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
