import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLoteComponent } from './delete-lote.component';

describe('DeleteLoteComponent', () => {
  let component: DeleteLoteComponent;
  let fixture: ComponentFixture<DeleteLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
