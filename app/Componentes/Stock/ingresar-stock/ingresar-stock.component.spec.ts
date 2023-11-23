import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarStockComponent } from './ingresar-stock.component';

describe('IngresarStockComponent', () => {
  let component: IngresarStockComponent;
  let fixture: ComponentFixture<IngresarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
