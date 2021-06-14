import { TestBed } from '@angular/core/testing';

import { ServicioIntento1Service } from './servicio-intento1.service';

describe('ServicioIntento1Service', () => {
  let service: ServicioIntento1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioIntento1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
