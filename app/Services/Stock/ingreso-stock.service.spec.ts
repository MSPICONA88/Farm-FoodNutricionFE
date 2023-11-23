import { TestBed } from '@angular/core/testing';

import { IngresoStockService } from './ingreso-stock.service';

describe('IngresoStockService', () => {
  let service: IngresoStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
