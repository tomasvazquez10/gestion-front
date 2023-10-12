import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaDetallesComponent } from './cuenta-detalles.component';

describe('CuentaDetallesComponent', () => {
  let component: CuentaDetallesComponent;
  let fixture: ComponentFixture<CuentaDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaDetallesComponent]
    });
    fixture = TestBed.createComponent(CuentaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
