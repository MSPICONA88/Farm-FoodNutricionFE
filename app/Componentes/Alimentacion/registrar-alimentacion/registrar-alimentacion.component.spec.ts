import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAlimentacionComponent } from './registrar-alimentacion.component';

describe('RegistrarAlimentacionComponent', () => {
  let component: RegistrarAlimentacionComponent;
  let fixture: ComponentFixture<RegistrarAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAlimentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
