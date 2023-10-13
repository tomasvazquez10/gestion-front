import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPopupService {

  private mensaje: string = '';
  private mostrarCancelar: boolean = true;

  constructor() { }

  setMensaje(mensaje: string): void {
    this.mensaje = mensaje;
  }

  getMensaje(): string {
    return this.mensaje;
  }

  getMostrarCancelar(): boolean {
    return this.mostrarCancelar;
  }

  setMostrarCancelar(mostrar: boolean): void{
    this.mostrarCancelar = mostrar;
  }
}
