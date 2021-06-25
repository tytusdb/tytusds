import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHashCerradaComponent } from './tabla-hash-cerrada.component';

describe('TablaHashCerradaComponent', () => {
  let component: TablaHashCerradaComponent;
  let fixture: ComponentFixture<TablaHashCerradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaHashCerradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaHashCerradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
