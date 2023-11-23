import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackBarAnimalesComponent } from './stack-bar-animales.component';

describe('StackBarAnimalesComponent', () => {
  let component: StackBarAnimalesComponent;
  let fixture: ComponentFixture<StackBarAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackBarAnimalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackBarAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
