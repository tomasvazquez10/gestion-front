import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent {

  @Input() mensaje: string = '¿Desea borrar el Cliente?';
  @Output() aceptar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  confirm() {
    this.aceptar.emit();
  }

  cancel() {
    this.cancelar.emit();
  }
}
