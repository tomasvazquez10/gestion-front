import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../model/cliente";
import {Observable, of} from "rxjs";
import {Cuenta} from "../model/cuenta";

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl = 'http://localhost:8080/cuenta';

  constructor(private http: HttpClient) { }

  crearCuenta(cuenta: Cuenta): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cuenta);
  }

  getCuenta(idUsuario: string) : Observable<Cuenta> {
    return  this.http.get<Cuenta>(this.apiUrl+"/usuario/"+idUsuario);
    //return of({id: 1, idUsuario: 2, saldo: BigInt(1235) });
  }

  updateCuenta(cuenta: Cuenta, id: number) : Observable<any> {
    return this.http.put(`${this.apiUrl+"/"+id}`, cuenta);
  }
}
