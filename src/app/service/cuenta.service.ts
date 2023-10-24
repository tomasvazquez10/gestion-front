import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  getCuentaByIdUsuario(idUsuario: string) : Observable<Cuenta> {
    return  this.http.get<Cuenta>(this.apiUrl+"/usuario/"+idUsuario);
    //return of({id: 1, idUsuario: 2, saldo: BigInt(1235) });
  }

  getCuenta(idCuenta: string) : Observable<Cuenta> {
    return  this.http.get<Cuenta>(this.apiUrl+"/"+idCuenta);
    //return of({id: 1, idUsuario: 2, saldo: BigInt(1235) });
  }

  getCuentas() : Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.apiUrl+"/all");
  }

  updateCuenta(cuenta: Cuenta, id: number) : Observable<any> {
    return this.http.put(`${this.apiUrl+"/"+id}`, cuenta);
  }
}
