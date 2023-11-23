import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTratComponent } from './consultar-trat.component';

describe('ConsultarTratComponent', () => {
  let component: ConsultarTratComponent;
  let fixture: ComponentFixture<ConsultarTratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarTratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarTratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
