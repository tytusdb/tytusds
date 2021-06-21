import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasimpleComponent } from './listasimple.component';

describe('ListasimpleComponent', () => {
  let component: ListasimpleComponent;
  let fixture: ComponentFixture<ListasimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
