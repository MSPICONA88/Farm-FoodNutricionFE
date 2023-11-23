import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPlaniComponent } from './consultar-plani.component';

describe('ConsultarPlaniComponent', () => {
  let component: ConsultarPlaniComponent;
  let fixture: ComponentFixture<ConsultarPlaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPlaniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarPlaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
