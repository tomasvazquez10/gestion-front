import { Injectable } from '@angular/core';
import {Proveedor} from "../model/proveedor";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private proveedores: Proveedor[] = [
    {id: 1, nombre: 'ARROZ S.A', nombreFantasia: 'ARROZ', direccion: 'Belgrano 24', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'},
    {id: 1, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 24', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'}
  ];

  private apiUrl = 'http://localhost:8080/proveedor';
  constructor(private http: HttpClient) { }

  getProveedores() : Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl+"/all");
    //return of(this.proveedores);
  }

  crearProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.post(`${this.apiUrl}`, proveedor);
  }
}
