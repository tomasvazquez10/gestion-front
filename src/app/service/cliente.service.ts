import { Injectable } from '@angular/core';
import { Cliente } from "../model/cliente";
import { Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

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

  downloadPDF(clientes: Cliente[]): Observable<Blob> {
    const url = 'http://localhost:8080/cliente/pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, clientes, {
      responseType: 'blob',
      headers: headers
    });
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

  datosCorrectos(nuevoCliente: Cliente) : boolean {
    console.log();
    if (nuevoCliente.nombre === ''){
      alert('Debe completar el campo Nombre');
      return false;
    }else if (nuevoCliente.nombreFantasia === ''){
      alert('Debe completar el campo Nombre Fantasia');
      return false;
    }else if (nuevoCliente.direccion === ''){
      alert('Debe completar el campo Direccion');
      return false;
    }else if (nuevoCliente.dni === ''){
      alert('Debe completar el campo DNI');
      return false;
    }else if (!this.validarDNI((nuevoCliente.dni).toString().length)){
      alert('Debe ingresar un formato correcto de DNI');
      return false;
    }else if (nuevoCliente.email === ''){
      alert('Debe completar el campo Email');
      return false;
    }else if (!this.validarEmail(nuevoCliente.email)){
      alert('Debe ingresar un formato correcto de Email');
      return false;
    }else if (nuevoCliente.nroReparto === 0){
      alert('Debe completar el campo Numero de Reparto');
      return false;
    }else if (!this.validarNumero((nuevoCliente.telefono).toString().length)){
      alert('Debe ingresar un formato correcto de Telefono');
      return false;
    }else {
      return true;
    }
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  validarDNI(dni: number): boolean {
    return dni >= 7 && dni <= 8;
  }

  validarNumero(numero: number): boolean {
    return numero >= 10;
  }
}
