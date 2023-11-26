import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosYCondicionesComponent } from './terminos-ycondiciones.component';

describe('TerminosYCondicionesComponent', () => {
  let component: TerminosYCondicionesComponent;
  let fixture: ComponentFixture<TerminosYCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminosYCondicionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminosYCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
