import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmPopupService} from "../../service/confirm-popup.service";

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit{

  @Input() mensaje: string = '¿Desea borrar el Cliente?';
  @Output() aceptar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private service: ConfirmPopupService) {}

  confirm() {
    this.aceptar.emit();
  }

  cancel() {
    this.cancelar.emit();
  }

  ngOnInit(): void {
    let mensajeService = this.service.getMensaje();
    if (mensajeService !== ''){
      this.mensaje = mensajeService;
    }
  }
}
