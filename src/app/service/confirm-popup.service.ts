import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPopupService {

  private mensaje: string = '';

  constructor() { }

  setMensaje(mensaje: string): void {
    this.mensaje = mensaje;
  }

  getMensaje(): string {
    return this.mensaje;
  }
}
