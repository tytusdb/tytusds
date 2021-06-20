import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenamientosComponent } from './ordenamientos.component';

describe('OrdenamientosComponent', () => {
  let component: OrdenamientosComponent;
  let fixture: ComponentFixture<OrdenamientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenamientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
