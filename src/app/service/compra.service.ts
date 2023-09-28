import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compra} from "../model/compra";

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:8080/compra';

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
}
