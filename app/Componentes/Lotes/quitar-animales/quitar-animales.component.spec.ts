import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarAnimalesComponent } from './quitar-animales.component';

describe('QuitarAnimalesComponent', () => {
  let component: QuitarAnimalesComponent;
  let fixture: ComponentFixture<QuitarAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarAnimalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitarAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
