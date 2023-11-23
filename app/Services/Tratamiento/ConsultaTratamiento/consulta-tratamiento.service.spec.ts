import { TestBed } from '@angular/core/testing';

import { ConsultaTratamientoService } from './consulta-tratamiento.service';

describe('ConsultaTratamientoService', () => {
  let service: ConsultaTratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaTratamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
