import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiaRepartoComponent } from './agregar-dia-reparto.component';

describe('AgregarDiaRepartoComponent', () => {
  let component: AgregarDiaRepartoComponent;
  let fixture: ComponentFixture<AgregarDiaRepartoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDiaRepartoComponent]
    });
    fixture = TestBed.createComponent(AgregarDiaRepartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
