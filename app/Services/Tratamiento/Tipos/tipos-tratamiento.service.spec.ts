import { TestBed } from '@angular/core/testing';

import { TiposTratamientoService } from './tipos-tratamiento.service';

describe('TiposTratamientoService', () => {
  let service: TiposTratamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposTratamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
