import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresarLotesComponent } from './egresar-lotes.component';

describe('EgresarLotesComponent', () => {
  let component: EgresarLotesComponent;
  let fixture: ComponentFixture<EgresarLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresarLotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresarLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
