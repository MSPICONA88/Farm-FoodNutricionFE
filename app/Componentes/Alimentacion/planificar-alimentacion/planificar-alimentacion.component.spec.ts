import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificarAlimentacionComponent } from './planificar-alimentacion.component';

describe('PlanificarAlimentacionComponent', () => {
  let component: PlanificarAlimentacionComponent;
  let fixture: ComponentFixture<PlanificarAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificarAlimentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificarAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
