import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compra} from "../model/compra";

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:8080/compra';
  private mostrarMensaje = false;
  private colorMensaje = 'green';

  constructor(private http: HttpClient) { }

  getCompras() : Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl+"/all");
  }

  crearCompra(compra: Compra): Observable<any> {
    return this.http.post(`${this.apiUrl}`, compra);
  }

  getCompra(id: string) : Observable<Compra> {
    return  this.http.get<Compra>(this.apiUrl+"/"+id);
  }

  getComprasByIdArticulo(id: string) : Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl+"/articulo/"+id);
  }

  borrarCompra(id: string) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/delete/"+id, {observe: 'response'});
  }

  pagarCompra(id: string) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/pagar/"+id, {observe: 'response'});
  }

  setColorMensaje(color: string) : void {
    this.colorMensaje = color;
  }

  getColorMensaje() : string {
    return this.colorMensaje;
  }

  getMostrarMensaje(): boolean {
    return this.mostrarMensaje;
  }

  setMostrarMensaje(mostrarMensaje: boolean): void {
    this.mostrarMensaje = mostrarMensaje;
  }
}
