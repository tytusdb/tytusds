import { TestBed } from '@angular/core/testing';

import { ListaDobleService } from './lista-doble.service';

describe('ListaDobleService', () => {
  let service: ListaDobleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDobleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
