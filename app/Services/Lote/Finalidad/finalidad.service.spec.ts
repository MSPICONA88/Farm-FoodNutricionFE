import { TestBed } from '@angular/core/testing';

import { FinalidadService } from './finalidad.service';

describe('FinalidadService', () => {
  let service: FinalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
