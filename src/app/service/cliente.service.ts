import { Injectable } from '@angular/core';
import { Cliente } from "../model/cliente";
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [
    {id: 1, nombre: 'Tomas', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' },
    {id: 2, nombre: 'Juan', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' },
    {id: 3, nombre: 'Fede', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' }
  ];

  private apiUrl = 'http://localhost:8080/cliente';
  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl+"/all");
   //return of(this.clientes);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cliente);
  }

  getCliente(id: string) : Observable<Cliente> {
    //return  this.http.get<Cliente>(this.apiUrl+"/"+id);
    return of({id: 1, nombre: 'Tomas', nombreFantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nroReparto: '2', telefono: '1165487548' });
  }

}
