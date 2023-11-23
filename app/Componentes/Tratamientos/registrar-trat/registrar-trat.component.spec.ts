import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTratComponent } from './registrar-trat.component';

describe('RegistrarTratComponent', () => {
  let component: RegistrarTratComponent;
  let fixture: ComponentFixture<RegistrarTratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarTratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
