import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPagoComponent } from './agregar-pago.component';

describe('AgregarPagoComponent', () => {
  let component: AgregarPagoComponent;
  let fixture: ComponentFixture<AgregarPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPagoComponent]
    });
    fixture = TestBed.createComponent(AgregarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
