import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarBorrarService {

  mensaje: string = '';

  constructor() { }

  getMensaje() : string {
    return this.mensaje;
  }

  setMensaje(mensaje: string) : void {
    this.mensaje = mensaje;
  }
}
