import { Injectable } from '@angular/core';
import {Proveedor} from "../model/proveedor";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private proveedores: Proveedor[] = [
    {id: 1, nombre: 'ARROZ S.A', nombreFantasia: 'ARROZ', direccion: 'Belgrano 243', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'},
    {id: 2, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 244', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'}
  ];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/proveedor';
  private url = 'http://localhost:8080/proveedor/edit';

  constructor(private http: HttpClient) { }

  getProveedores() : Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl+"/all");
    //return of(this.proveedores);
  }

  crearProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.post(`${this.apiUrl}`, proveedor);
  }

  getProveedor(id: string) : Observable<Proveedor> {
    return  this.http.get<Proveedor>(this.apiUrl+"/"+id);
    //return of({id: 2, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 244', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'});
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

}
