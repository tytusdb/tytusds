import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodorapidoComponent } from './metodorapido.component';

describe('MetodorapidoComponent', () => {
  let component: MetodorapidoComponent;
  let fixture: ComponentFixture<MetodorapidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodorapidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodorapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
