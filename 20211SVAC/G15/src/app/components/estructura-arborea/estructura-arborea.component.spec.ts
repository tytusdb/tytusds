import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraArboreaComponent } from './estructura-arborea.component';

describe('EstructuraArboreaComponent', () => {
  let component: EstructuraArboreaComponent;
  let fixture: ComponentFixture<EstructuraArboreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraArboreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraArboreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
