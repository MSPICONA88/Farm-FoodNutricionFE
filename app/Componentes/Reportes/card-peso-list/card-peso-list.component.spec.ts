import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPesoListComponent } from './card-peso-list.component';

describe('CardPesoListComponent', () => {
  let component: CardPesoListComponent;
  let fixture: ComponentFixture<CardPesoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPesoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPesoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
