import { Injectable } from '@angular/core';
import {Articulo} from "../model/articulo";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {PrecioArticulo} from "../model/precioArticulo";
import {Cliente} from "../model/cliente";


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private articulos: Articulo[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/articulo';
  private url = 'http://localhost:8080/articulo/edit';
  private urlPrecio = 'http://localhost:8080/precio';
  private campo: string = '';
  private valor: string = '';

  constructor(private http: HttpClient) {}

  getArticulos() : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/all");
  }

  crearArticulo(articulo: Articulo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, articulo);
  }

  buscarArticulos(campo: string, valor: string) : Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl+"/buscar/"+campo+"/"+valor);
  }

  getArticuloByNro(numero: number) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/numero/"+numero, {observe: 'response'});
  }

  crearPrecioArticulo(precioArticulo: PrecioArticulo): Observable<any> {
    return this.http.post(`${this.urlPrecio}`, precioArticulo);
  }

  getArticulo(id: string) : Observable<Articulo> {
    return  this.http.get<Articulo>(this.apiUrl+"/"+id);
  }

  editarArticulo(articulo: Articulo): Observable<any> {
    console.log(articulo);
    return this.http.post(`${this.url}`, articulo);
  }

  borrarArticulo(id: string) : Observable<HttpResponse<any>> {
    return  this.http.get(this.apiUrl+"/delete/"+id, {observe: 'response'});
  }

  getMostrarMensaje(): boolean {
    return this.mostrarMensaje;
  }

  setMostrarMensaje(mostrarMensaje: boolean): void {
    this.mostrarMensaje = mostrarMensaje;
  }

  setColorMensaje(color: string) : void {
    this.colorMensaje = color;
  }

  getColorMensaje() : string {
    return this.colorMensaje;
  }

  setCampoValor(campo: string, valor: string) : void{
    this.campo = campo;
    this.valor = valor;
  }

  getCampo(): string {
    return this.campo;
  }

  getValor(): string {
    return this.valor;
  }

  existeNroArticulo(nroArticulo: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getArticuloByNro(nroArticulo).subscribe(
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
          console.error('Error al buscar Articulo:', error);
          reject(error);
        }
      );
    });
  }

  datosCorrectos(nuevoArticulo: Articulo) : boolean {
    if (nuevoArticulo.nombre === ''){
      alert('Debe completar el campo Nombre');
      return false;
    }else if (nuevoArticulo.descripcion === ''){
      alert('Debe completar el campo Descripcion');
      return false;
    }else if (!this.validarNumero(nuevoArticulo.nroArticulo)){
      alert('Debe ingresar un valor en Numero Articulo');
      return false;
    }else if (nuevoArticulo.cuitProveedor === ''){
      alert('Debe completar el campo CUIT');
      return false;
    }else if (!this.validarCUIT((nuevoArticulo.cuitProveedor).toString().length)){
      alert('Debe ingresar un formato correcto de CUIT');
      return false;
    }else if (!this.validarNumero(nuevoArticulo.precio)){
      alert('Debe ingresar un valor en Precio');
      return false;
    }else {
      return true;
    }
  }

  validarCUIT(cuit: number): boolean {
    return cuit == 11;
  }

  validarNumero(numero: number) : boolean {
    return numero > 0;
  }

  validarNumeroArticulo(numero : number) : boolean {
    return true;
  }

  downloadPDF(articulos: Articulo[]): Observable<Blob> {
    const url = 'http://localhost:8080/articulo/pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, articulos, {
      responseType: 'blob',
      headers: headers
    });
  }
}
