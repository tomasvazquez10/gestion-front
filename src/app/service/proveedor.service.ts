import { Injectable } from '@angular/core';
import {Proveedor} from "../model/proveedor";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/proveedor';
  private url = 'http://localhost:8080/proveedor/edit';
  private campo: string = '';
  private valor: string = '';

  constructor(private http: HttpClient) { }

  getProveedores() : Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl+"/all");
  }

  buscarProveedores(campo: string, valor: string) : Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl+"/buscar/"+campo+"/"+valor);
  }

  crearProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.post(`${this.apiUrl}`, proveedor);
  }

  getProveedor(id: string) : Observable<Proveedor> {
    return  this.http.get<Proveedor>(this.apiUrl+"/"+id);
  }

  editarProveedor(proveedor: Proveedor): Observable<any> {
    console.log(proveedor);
    return this.http.post(`${this.url}`, proveedor);
  }

  borrarProveedor(id: string) : Observable<HttpResponse<any>> {

    return  this.http.get(this.apiUrl+"/delete/"+id, {observe: 'response'});
    //return of(new HttpResponse({status: 200, statusText: 'OK'}));
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
    console.log(campo+" - "+valor);
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
