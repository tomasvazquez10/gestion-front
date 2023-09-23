import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrecioArticulo} from "../model/precioArticulo";

@Injectable({
  providedIn: 'root'
})
export class PrecioArticuloService {

  private apiUrl = 'http://localhost:8080/precio';

  constructor(private http: HttpClient) { }


  getPrecios() : Observable<PrecioArticulo[]> {
    return this.http.get<PrecioArticulo[]>(this.apiUrl+"/all");
    //return of(this.articuloes);
  }

  crearPrecio(precioArticulo: PrecioArticulo): Observable<any> {
    console.log("preciooo");
    return this.http.post(`${this.apiUrl}`, precioArticulo);
  }
}
