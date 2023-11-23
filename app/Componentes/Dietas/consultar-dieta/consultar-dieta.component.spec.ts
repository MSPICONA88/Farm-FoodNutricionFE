import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDietaComponent } from './consultar-dieta.component';

describe('ConsultarDietaComponent', () => {
  let component: ConsultarDietaComponent;
  let fixture: ComponentFixture<ConsultarDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarDietaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
