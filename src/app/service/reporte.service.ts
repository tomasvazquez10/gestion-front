import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pago} from "../model/pago";
import {Cliente} from "../model/cliente";

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

  downloadPagosPDF(pagos: Pago[]): Observable<Blob> {
    const url = 'http://localhost:8080/reporte/pagos/pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, pagos, {
      responseType: 'blob',
      headers: headers
    });
  }
}
