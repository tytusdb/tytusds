import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLinealesComponent } from './no-lineales.component';

describe('NoLinealesComponent', () => {
  let component: NoLinealesComponent;
  let fixture: ComponentFixture<NoLinealesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLinealesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLinealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
