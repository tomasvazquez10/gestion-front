import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecioArticuloComponent } from './lista-precio-articulo.component';

describe('ListaPrecioArticuloComponent', () => {
  let component: ListaPrecioArticuloComponent;
  let fixture: ComponentFixture<ListaPrecioArticuloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPrecioArticuloComponent]
    });
    fixture = TestBed.createComponent(ListaPrecioArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
