import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pago} from "../model/pago";
import {Cliente} from "../model/cliente";
import {Pedido} from "../model/pedido";
import {Articulo} from "../model/articulo";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = 'http://localhost:8080/reporte';

  constructor(private http: HttpClient) { }

  getPagosByDniCliente(dni: string) : Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl+"/pagos/cliente/"+dni);
  }

  getPagosByNroReparto(nroReparto: string) : Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl+"/pagos/reparto/"+nroReparto);
  }

  getPedidosByFecha(fecha: string) : Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl+"/pedidos/fecha/"+fecha);
  }

  getPedidosEntreFechas(fechaDesde: string, fechaHasta: string) : Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl+"/pedidos/fechas/"+fechaDesde+"/"+fechaHasta);
  }

  getArticulosMasVendidos() : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/articulos/masVendidos");
  }

  getArticulosMasVendidosEntre(fechaDesde: string, fechaHasta: string) : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/articulos/masVentas/"+fechaDesde+"/"+fechaHasta);
  }

  downloadPagosPDF(pagos: Pago[]): Observable<Blob> {
    const url = 'http://localhost:8080/reporte/pagos/pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, pagos, {
      responseType: 'blob',
      headers: headers
    });
  }

  downloadArticulosPDF(articulos: Articulo[]): Observable<Blob> {
    const url = 'http://localhost:8080/reporte/articulos/pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, articulos, {
      responseType: 'blob',
      headers: headers
    });
  }

  downloadPedidosPDF(pedidos: Pedido[]): Observable<Blob> {
    const url = 'http://localhost:8080/reporte/pedidos/pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, pedidos, {
      responseType: 'blob',
      headers: headers
    });
  }
}
