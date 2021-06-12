import { TestBed } from '@angular/core/testing';

import { EstructurasService } from './estructuras.service';

describe('EstructurasService', () => {
  let service: EstructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
