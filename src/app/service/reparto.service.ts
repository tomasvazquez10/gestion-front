import { Injectable } from '@angular/core';
import {Reparto} from "../model/reparto";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Articulo} from "../model/articulo";

@Injectable({
  providedIn: 'root'
})
export class RepartoService {

  private articulos: Reparto[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/reparto';
  private url = 'http://localhost:8080/reparto/edit';

  constructor(private http: HttpClient) {}

  getRepartos() : Observable<Reparto[]> {
    return this.http.get<Reparto[]>(this.apiUrl+"/all");
  }

  getNroRepartos() : Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl+"/numeros");
  }

  crearReparto(reparto: Reparto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, reparto);
  }

  getReparto(id: string) : Observable<Reparto> {
    return  this.http.get<Reparto>(this.apiUrl+"/"+id);
  }

  editarReparto(reparto: Reparto): Observable<any> {
    console.log(reparto);
    return this.http.post(`${this.url}`, reparto);
  }

  borrarReparto(id: string) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/delete/"+id, {observe: 'response'});
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

}
