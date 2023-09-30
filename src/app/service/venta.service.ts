import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pago} from "../model/pago";
import {Venta} from "../model/venta";

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:8080/venta';

  constructor(private http: HttpClient) { }

  getVentas() : Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl+"/all");
  }

  crearVenta(venta: Venta): Observable<any> {
    return this.http.post(`${this.apiUrl}`, venta);
  }

  getVenta(id: string) : Observable<Venta> {
    return  this.http.get<Venta>(this.apiUrl+"/"+id);
  }

  getVentaByPedidoId(id: string) : Observable<Venta> {
    return  this.http.get<Venta>(this.apiUrl+"/pedido/"+id);
  }
}
