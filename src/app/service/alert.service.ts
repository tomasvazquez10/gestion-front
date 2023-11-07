import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private mostrarMensaje: boolean = false;
  private colorMensaje: string = 'green';
  private mensaje: string = '';

  constructor() { }

  getMensaje() : string {
    return this.mensaje;
  }

  getMostrarMensaje(): boolean {
    return this.mostrarMensaje;
  }

  setMostrarMensaje(value: boolean) {
    this.mostrarMensaje = value;
  }

  getColorMensaje(): string {
    return this.colorMensaje;
  }

  setColorMensaje(value: string) {
    this.colorMensaje = value;
  }

  setMensaje(value: string) {
    this.mensaje = value;
  }
}
