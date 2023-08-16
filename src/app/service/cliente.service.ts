import { Injectable } from '@angular/core';
import { Cliente } from "../model/cliente";
import { CLIENTES } from "../model/mock-clientes";
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [
    {id: 1, nombre: 'Tomas', nombre_fantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nro_reparto: '2', telefono: '1165487548' },
    {id: 2, nombre: 'Juan', nombre_fantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nro_reparto: '2', telefono: '1165487548' },
    {id: 3, nombre: 'Fede', nombre_fantasia: 'TOM', dni: '12345876', direccion: 'avenida san martin 123', email: 'tomas@mail.com', nro_reparto: '2', telefono: '1165487548' }
  ];
  private apiUrl = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient) { }

  getClientes() : Observable<Cliente[]> {
    //return this.http.get<Cliente[]>(this.apiUrl);
    return of(this.clientes);
  }

  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cliente);
  }

}
