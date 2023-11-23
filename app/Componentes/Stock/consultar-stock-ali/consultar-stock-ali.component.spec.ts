import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarStockAliComponent } from './consultar-stock-ali.component';

describe('ConsultarStockAliComponent', () => {
  let component: ConsultarStockAliComponent;
  let fixture: ComponentFixture<ConsultarStockAliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarStockAliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarStockAliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
