import { Injectable } from '@angular/core';
import { Cliente } from "../model/cliente";
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Cuenta} from "../model/cuenta";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [
    {id: 1, nombre: 'Tomas', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' },
    {id: 2, nombre: 'Juan', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' },
    {id: 3, nombre: 'Fede', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' }
  ];
  private mostrarMensaje = false;

  private apiUrl = 'http://localhost:8080/cliente';
  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl+"/all");
   //return of(this.clientes);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    console.log(cliente);
    return this.http.post(`${this.apiUrl}`, cliente);
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

}
