import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRepartosComponent } from './lista-repartos.component';

describe('ListaRepartosComponent', () => {
  let component: ListaRepartosComponent;
  let fixture: ComponentFixture<ListaRepartosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaRepartosComponent]
    });
    fixture = TestBed.createComponent(ListaRepartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
