import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDietaComponent } from './registrar-dieta.component';

describe('RegistrarDietaComponent', () => {
  let component: RegistrarDietaComponent;
  let fixture: ComponentFixture<RegistrarDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDietaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
