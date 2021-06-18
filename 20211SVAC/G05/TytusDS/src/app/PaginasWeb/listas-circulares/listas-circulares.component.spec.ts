import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasCircularesComponent } from './listas-circulares.component';

describe('ListasCircularesComponent', () => {
  let component: ListasCircularesComponent;
  let fixture: ComponentFixture<ListasCircularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasCircularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasCircularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
