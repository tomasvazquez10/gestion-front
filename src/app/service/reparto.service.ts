import { Injectable } from '@angular/core';
import {Reparto} from "../model/reparto";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";

@Injectable({
  providedIn: 'root'
})
export class RepartoService {

  private articulos: Reparto[] = [];
  private mostrarMensaje = false;
  private colorMensaje = 'green';
  private apiUrl = 'http://localhost:8080/reparto';
  private url = 'http://localhost:8080/reparto/edit';
  private campo: string = '';
  private valor: string = '';

  constructor(private http: HttpClient) {}

  getRepartos() : Observable<Reparto[]> {
    return this.http.get<Reparto[]>(this.apiUrl+"/all");
  }

  buscarReparto(campo: string, valor: string) : Observable<Reparto[]> {
    if (campo === 'Numero'){
      return this.getRepartosByNro(+valor);
    }else{
      return this.getRepartosdDiaSemana(valor);
    }
  }

  getRepartosByNro(nroReparto: number) : Observable<Reparto[]> {
    return this.http.get<Reparto[]>(this.apiUrl+"/numero/"+nroReparto);
  }

  getRepartosdDiaSemana(dia: string) : Observable<Reparto[]> {
    return this.http.get<Reparto[]>(this.apiUrl+"/dia_semana/"+dia);
  }

  getNroRepartos() : Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl+"/numeros");
  }

  getDiasSemanaDisponibles(nroReparto: number) : Observable<String[]> {
    return this.http.get<String[]>(this.apiUrl+"/diaSemana/"+nroReparto);
  }

  crearReparto(reparto: Reparto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, reparto);
  }

  getReparto(id: string) : Observable<Reparto> {
    return  this.http.get<Reparto>(this.apiUrl+"/"+id);
  }

  editarReparto(reparto: Reparto): Observable<any> {
    console.log(reparto);
    return this.http.post(`${this.url}`, reparto);
  }

  borrarReparto(id: number) : Observable<HttpResponse<any>> {
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
}
