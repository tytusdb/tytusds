import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispersaComponent } from './dispersa.component';

describe('DispersaComponent', () => {
  let component: DispersaComponent;
  let fixture: ComponentFixture<DispersaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispersaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispersaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
