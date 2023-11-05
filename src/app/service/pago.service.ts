import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compra} from "../model/compra";
import {Pago} from "../model/pago";

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'http://localhost:8080/pago';

  constructor(private http: HttpClient) { }

  getPagos() : Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl+"/all");
  }

  getPagosByIdPedido(idPedido: string) : Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl+"/pedido/"+idPedido);
  }

  crearPago(pago: Pago): Observable<any> {
    return this.http.post(`${this.apiUrl}`, pago);
  }

  getPago(id: string) : Observable<Pago> {
    return  this.http.get<Pago>(this.apiUrl+"/"+id);
  }

  getSaldoPendiente(idPedido: string) : Observable<number> {
    return  this.http.get<number>(this.apiUrl+"/saldoPendiente/"+idPedido);
  }
}
