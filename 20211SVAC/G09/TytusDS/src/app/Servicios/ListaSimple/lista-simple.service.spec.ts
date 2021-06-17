import { TestBed } from '@angular/core/testing';

import { ListaSimpleService } from './lista-simple.service';

describe('ListaSimpleService', () => {
  let service: ListaSimpleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSimpleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
