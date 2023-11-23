import { TestBed } from '@angular/core/testing';

import { AltaTratamientoService } from './alta-tratamiento.service';

describe('AltaTratamientoService', () => {
  let service: AltaTratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltaTratamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
