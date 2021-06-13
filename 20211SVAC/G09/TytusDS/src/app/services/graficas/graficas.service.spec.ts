import { TestBed } from '@angular/core/testing';

import { GraficasService } from './graficas.service';

describe('GraficasService', () => {
  let service: GraficasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
