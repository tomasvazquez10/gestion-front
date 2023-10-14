import { Injectable } from '@angular/core';
import {Articulo} from "../model/articulo";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrecioArticulo} from "../model/precioArticulo";
import {Cliente} from "../model/cliente";


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private articulos: Articulo[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/articulo';
  private url = 'http://localhost:8080/articulo/edit';
  private urlPrecio = 'http://localhost:8080/precio';
  private campo: string = '';
  private valor: string = '';

  constructor(private http: HttpClient) {}

  getArticulos() : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/all");
  }

  crearArticulo(articulo: Articulo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, articulo);
  }

  buscarArticulos(campo: string, valor: string) : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/buscar/"+campo+"/"+valor);
  }

  crearPrecioArticulo(precioArticulo: PrecioArticulo): Observable<any> {
    return this.http.post(`${this.urlPrecio}`, precioArticulo);
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

  setCampoValor(campo: string, valor: string) : void{
    this.campo = campo;
    this.valor = valor;
  }

  getCampo(): string {
    return this.campo;
  }

  getValor(): string {
    return this.valor;
  }
}
