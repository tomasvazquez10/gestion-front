import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proveedor} from "../model/proveedor";
import {Pedido} from "../model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/pedido';
  private url = 'http://localhost:8080/pedido/edit';
  constructor(private http: HttpClient) { }

  getPedidos() : Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl+"/all");
    //return of(this.proveedores);
  }

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}`, pedido);
  }

  getPedido(id: string) : Observable<Pedido> {
    return  this.http.get<Pedido>(this.apiUrl+"/"+id);
    //return of({id: 2, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 244', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'});
  }

  getPedidosByCliente(idCliente: string) : Observable<Pedido[]> {
    return  this.http.get<Pedido[]>(this.apiUrl+"/cliente/"+idCliente);
    //return of({id: 2, nombre: 'CEBOLLA S.A', nombreFantasia: 'CEBOLLA', direccion: 'Belgrano 244', cuit: '30-45789698-1', telefono: '1156478996', email: 'arroz@gmail.com'});
  }

  editarPedido(pedido: Pedido): Observable<any> {
    console.log(pedido);
    return this.http.post(`${this.url}`, pedido);
  }

}
