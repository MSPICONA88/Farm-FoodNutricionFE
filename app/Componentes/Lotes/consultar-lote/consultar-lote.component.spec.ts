import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLoteComponent } from './consultar-lote.component';

describe('ConsultarLoteComponent', () => {
  let component: ConsultarLoteComponent;
  let fixture: ComponentFixture<ConsultarLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarLoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
