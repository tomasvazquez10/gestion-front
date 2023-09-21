import { Injectable } from '@angular/core';
import {Articulo} from "../model/articulo";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private articulos: Articulo[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/articulo';
  private url = 'http://localhost:8080/articulo/edit';

  constructor(private http: HttpClient) { }

  getArticulos() : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/all");
    //return of(this.articuloes);
  }

  crearArticulo(articulo: Articulo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, articulo);
  }

  getArticulo(id: string) : Observable<Articulo> {
    return  this.http.get<Articulo>(this.apiUrl+"/"+id);
  }

  editarArticulo(articulo: Articulo): Observable<any> {
    console.log(articulo);
    return this.http.post(`${this.url}`, articulo);
  }

  borrarArticulo(id: string) : Observable<HttpResponse<any>> {
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
