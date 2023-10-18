import { Injectable } from '@angular/core';
import { Cliente } from "../model/cliente";
import { Observable, of} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/cliente';
  private url = 'http://localhost:8080/cliente/edit';
  private campo: string = '';
  private valor: string = '';

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

  buscarClientes(campo: string, valor: string) : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl+"/buscar/"+campo+"/"+valor);
  }

  getClienteByDNI(dni: string) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/dni/"+dni, {observe: 'response'});
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

  crearCliente(cliente: Cliente): Observable<any> {
    console.log(cliente);
    return this.http.post(`${this.apiUrl}`, cliente);
  }

  getListadoPDF(clientes: Cliente[]): Observable<any> {
    return this.http.post(this.apiUrl+"/pdf", clientes);
  }

  getCliente(id: string) : Observable<Cliente> {
    return  this.http.get<Cliente>(this.apiUrl+"/"+id);
  }

  updateCliente(cliente: any, id: string) : Observable<any> {
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

  existeDNI(dni: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getClienteByDNI(dni).subscribe(
        (respuesta) => {
          console.log(respuesta);
          console.log(respuesta.status);
          if (respuesta.status === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          console.error('Error al buscar DNI:', error);
        }
      );
    });
  }
}
