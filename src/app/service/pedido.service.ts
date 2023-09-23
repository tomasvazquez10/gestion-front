import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Proveedor} from "../model/proveedor";
import {Pedido} from "../model/pedido";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/pedido';
  private url = 'http://localhost:8080/pedido/edit';
  private mostrarMensaje = false;
  private colorMensaje = 'red';
  private dniCliente = '';

  constructor(private http: HttpClient) { }

  getPedidos() : Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl+"/all");
    //return of(this.proveedores);
  }

  crearPedido(pedido: Pedido): Observable<any> {
    //resto total del pedido a la cuenta del cliente

    return this.http.post(`${this.apiUrl}`, pedido);
  }

  getPedido(id: string) : Observable<Pedido> {
    return  this.http.get<Pedido>(this.apiUrl+"/"+id);
    //return of({id: 2, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 244', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'});
  }

  getPedidosByCliente(idCliente: string) : Observable<Pedido[]> {
    return  this.http.get<Pedido[]>(this.apiUrl+"/cliente/"+idCliente);
    //return of({id: 2, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 244', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'});
  }

  getMostrarMensaje(): boolean {
    return this.mostrarMensaje;
  }

  setMostrarMensaje(mostrarMensaje: boolean): void {
    this.mostrarMensaje = mostrarMensaje;
  }

  setColorMensaje(color: string) : void {
    this.colorMensaje = color;
  }

  getColorMensaje() : string {
    return this.colorMensaje;
  }

  editarPedido(pedido: Pedido): Observable<any> {
    console.log(pedido);
    return this.http.post(`${this.url}`, pedido);
  }

  getDniCliente(): string {
    console.log("get dni");
    return this.dniCliente;
  }

  setDniCliente(dni: string): void {
    console.log("seteo dni");
    this.dniCliente = dni;
  }

}
