import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proveedor} from "../model/proveedor";
import {Articulo} from "../model/articulo";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlProducto = 'http://localhost:8080/productos';
  private urlArticulo = 'http://localhost:8080/articulo';
  private url = 'http://localhost:8080/proveedor/edit';
  constructor(private http: HttpClient) { }

  getArticulos() : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.urlArticulo+"/all");
    //return of(this.proveedores);
  }
}
