import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaAlimentosComponent } from './crear-alimentos.component';

describe('CreaAlimentosComponent', () => {
  let component: CreaAlimentosComponent;
  let fixture: ComponentFixture<CreaAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaAlimentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
