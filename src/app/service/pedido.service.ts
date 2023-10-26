import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Proveedor} from "../model/proveedor";
import {Pedido} from "../model/pedido";
import {Cliente} from "../model/cliente";
import {Pago} from "../model/pago";

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
  }

  getPedidoById(id: string) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/"+id, {observe: 'response'} );
  }

  getPedidosByCliente(idCliente: string) : Observable<Pedido[]> {
    return  this.http.get<Pedido[]>(this.apiUrl+"/cliente/"+idCliente);
  }

  descargarFacturaPDF(idPedido: string): Observable<Blob> {
    const url = 'http://localhost:8080/pedido/factura/'+idPedido;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(url, {
      responseType: 'blob',
      headers: headers
    });
  }

  existePedido(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getPedidoById(id).subscribe(
        (respuesta) => {
          console.log(respuesta);
          console.log(respuesta.status);
          if (respuesta.status === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          console.error('Error al buscar Pedido:', error);
        }
      );
    });
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
