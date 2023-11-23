import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMoviComponent } from './registrar-movi.component';

describe('RegistrarMoviComponent', () => {
  let component: RegistrarMoviComponent;
  let fixture: ComponentFixture<RegistrarMoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMoviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
