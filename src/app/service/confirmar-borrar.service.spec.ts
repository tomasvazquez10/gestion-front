import { TestBed } from '@angular/core/testing';

import { ConfirmarBorrarService } from './confirmar-borrar.service';

describe('ConfirmarBorrarService', () => {
  let service: ConfirmarBorrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarBorrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
