import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodificacionhuffmannComponent } from './codificacionhuffmann.component';

describe('CodificacionhuffmannComponent', () => {
  let component: CodificacionhuffmannComponent;
  let fixture: ComponentFixture<CodificacionhuffmannComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodificacionhuffmannComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodificacionhuffmannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
