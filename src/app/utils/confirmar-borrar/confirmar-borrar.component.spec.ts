import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarBorrarComponent } from './confirmar-borrar.component';

describe('ConfirmarBorrarComponent', () => {
  let component: ConfirmarBorrarComponent;
  let fixture: ComponentFixture<ConfirmarBorrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarBorrarComponent]
    });
    fixture = TestBed.createComponent(ConfirmarBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
