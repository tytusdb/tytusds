import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHashAbiertaComponent } from './tabla-hash-abierta.component';

describe('TablaHashAbiertaComponent', () => {
  let component: TablaHashAbiertaComponent;
  let fixture: ComponentFixture<TablaHashAbiertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaHashAbiertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaHashAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
