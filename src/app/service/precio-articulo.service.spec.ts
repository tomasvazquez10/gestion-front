import { TestBed } from '@angular/core/testing';

import { PrecioArticuloService } from './precio-articulo.service';

describe('PrecioArticuloService', () => {
  let service: PrecioArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
