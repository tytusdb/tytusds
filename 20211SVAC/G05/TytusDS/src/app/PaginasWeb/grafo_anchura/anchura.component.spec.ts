import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchuraComponent } from './anchura.component';

describe('AnchuraComponent', () => {
  let component: AnchuraComponent;
  let fixture: ComponentFixture<AnchuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
