import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCompraComponent } from './agregar-compra.component';

describe('AgregarCompraComponent', () => {
  let component: AgregarCompraComponent;
  let fixture: ComponentFixture<AgregarCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCompraComponent]
    });
    fixture = TestBed.createComponent(AgregarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
