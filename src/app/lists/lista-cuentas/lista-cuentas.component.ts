import {Component, OnInit} from '@angular/core';
import {Cuenta} from "../../model/cuenta";
import {CuentaService} from "../../service/cuenta.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-cuentas',
  templateUrl: './lista-cuentas.component.html',
  styleUrls: ['./lista-cuentas.component.css']
})
export class ListaCuentasComponent implements OnInit{

  cuentas: Cuenta[] = [];

  constructor(private service: CuentaService, private router: Router) {}

  getCuentas(): void {
    this.service.getCuentas()
      .subscribe( cuentas => this.cuentas = cuentas);
  }

  ngOnInit(): void {
    this.getCuentas();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/cuenta-detalles/'+id]);
  }

}
