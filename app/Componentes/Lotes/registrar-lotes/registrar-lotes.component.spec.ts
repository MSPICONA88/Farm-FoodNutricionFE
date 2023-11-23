import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLotesComponent } from './registrar-lotes.component';

describe('RegistrarLotesComponent', () => {
  let component: RegistrarLotesComponent;
  let fixture: ComponentFixture<RegistrarLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarLotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
