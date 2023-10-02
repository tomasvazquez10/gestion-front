import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRepartoComponent } from './agregar-reparto.component';

describe('AgregarRepartoComponent', () => {
  let component: AgregarRepartoComponent;
  let fixture: ComponentFixture<AgregarRepartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarRepartoComponent]
    });
    fixture = TestBed.createComponent(AgregarRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
