import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashabiertaComponent } from './hashabierta.component';

describe('HashabiertaComponent', () => {
  let component: HashabiertaComponent;
  let fixture: ComponentFixture<HashabiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashabiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashabiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
