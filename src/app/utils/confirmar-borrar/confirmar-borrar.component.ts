import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfirmarBorrarService} from "../../service/confirmar-borrar.service";

@Component({
  selector: 'app-confirmar-borrar',
  templateUrl: './confirmar-borrar.component.html',
  styleUrls: ['./confirmar-borrar.component.css']
})
export class ConfirmarBorrarComponent implements OnInit{

  mensaje: string = '';
  @Output() acept = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private service: ConfirmarBorrarService) {}

  aceptar() : void{
    this.acept.emit();
  }

  cancelar() : void{
    this.cancel.emit();
  }

  ngOnInit(): void {
    this.mensaje = this.service.getMensaje();
  }
}
