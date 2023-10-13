import { Injectable } from '@angular/core';
import { Cliente } from "../model/cliente";
import { Observable, of} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Cuenta} from "../model/cuenta";
import {Proveedor} from "../model/proveedor";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/cliente';
  private url = 'http://localhost:8080/cliente/edit';

  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
    console.log(this.clientes);
    if (this.clientes.length === 0){
      return this.http.get<Cliente[]>(this.apiUrl+"/all");
    }else {
      return of(this.clientes);
    }
  }

  setClientes(clientes: Cliente[]) : void {
    this.clientes = clientes;
    console.log(this.clientes);
  }

  buscarClientes(campo: String, valor: String) : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl+"/buscar/"+campo+"/"+valor);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    console.log(cliente);
    return this.http.post(`${this.apiUrl}`, cliente);
  }

  getListadoPDF(clientes: Cliente[]): Observable<any> {
    return this.http.post(this.apiUrl+"/pdf", clientes);
  }

  getCliente(id: string) : Observable<Cliente> {
    return  this.http.get<Cliente>(this.apiUrl+"/"+id);
    //return of({id: 1, nombre: 'Tomas', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' });
  }

  updateCliente(cliente: any, id: string) : Observable<any> {
    //private url = this.apiUrl+'';
    console.log('id'+id);
    return this.http.put(this.apiUrl+"/"+id, cliente);
  }

  actualizarCliente(id: number, datosCliente: Cliente): Observable<any> {
    //const url = `${this.apiUrl}/${id}`;
    const url = 'http://localhost:8080/cliente/7';
    const body = {
      id: 7,
      dni: "3456876",
      nombre: "Matias",
      nombreFantasia: "Mat",
      email: "matias@mail.com",
      direccion: "San Martin 200",
      telefono: "11458785",
      nroReparto: 3,
      activo: true
    };
    console.log(url);
    console.log(body);
    this.http.put<any>(url, body);
    console.log('llamado ok');
    return new Observable<any>;
  }

  getMostrarMensaje(): boolean {
    return this.mostrarMensaje;
  }

  setMostrarMensaje(mostrarMensaje: boolean): void {
    this.mostrarMensaje = mostrarMensaje;
  }

  borrarCliente(id: string) : Observable<HttpResponse<any>> {

    return  this.http.get(this.apiUrl+"/delete/"+id, {observe: 'response'});
    //return of(new HttpResponse({status: 200, statusText: 'OK'}));
  }

  setColorMensaje(color: string) : void {
    this.colorMensaje = color;
  }

  getColorMensaje() : string {
    return this.colorMensaje;
  }

  editarCliente(cliente: Cliente): Observable<any> {
    console.log(cliente);
    return this.http.post(`${this.url}`, cliente);
  }

}
