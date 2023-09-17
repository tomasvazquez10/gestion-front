import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Proveedor} from "../model/proveedor";
import {Articulo} from "../model/articulo";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlProducto = 'http://localhost:8080/productos';
  private urlArticulo = 'http://localhost:8080/articulo';
  private url = 'http://localhost:8080/proveedor/edit';
  private alimentos: Articulo[] = [
    {
      id: 1,
      nroArticulo: 2001,
      nombre: 'Manzanas',
      descripcion: 'Manzanas frescas y jugosas',
      cuitProveedor: '1234567890',
      stock: 100,
      precio: 1.99
    },
    {
      id: 2,
      nroArticulo: 2002,
      nombre: 'Arroz integral',
      descripcion: 'Arroz integral de grano largo',
      cuitProveedor: '9876543210',
      stock: 50,
      precio: 2.49
    },
    {
      id: 3,
      nroArticulo: 2003,
      nombre: 'Yogur natural',
      descripcion: 'Yogur natural sin azúcar añadido',
      cuitProveedor: '5555555555',
      stock: 75,
      precio: 1.29
    }
  ];
  constructor(private http: HttpClient) { }

  getArticulos() : Observable<Articulo[]> {
    //return this.http.get<Articulo[]>(this.urlArticulo+"/all");
    return of(this.alimentos);
  }
}
