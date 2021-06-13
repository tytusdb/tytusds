import { TestBed } from '@angular/core/testing';

import { SubirtiendaService } from './subirtienda.service';

describe('SubirtiendaService', () => {
  let service: SubirtiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirtiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
