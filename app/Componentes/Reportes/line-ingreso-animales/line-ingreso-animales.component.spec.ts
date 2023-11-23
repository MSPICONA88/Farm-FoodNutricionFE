import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineIngresoAnimalesComponent } from './line-ingreso-animales.component';

describe('LineIngresoAnimalesComponent', () => {
  let component: LineIngresoAnimalesComponent;
  let fixture: ComponentFixture<LineIngresoAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineIngresoAnimalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineIngresoAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
