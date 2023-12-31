import { Component } from '@angular/core';
import {Cuenta} from "../../model/cuenta";
import {CuentaService} from "../../service/cuenta.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-cuenta-detalles',
  templateUrl: './cuenta-detalles.component.html',
  styleUrls: ['./cuenta-detalles.component.css']
})
export class CuentaDetallesComponent {

  idUsuario: string = '';
  idCuenta: string = '';
  cuenta: Cuenta = {id: 0, idUsuario: "0", dniCliente: "", saldo: 0, pagos: [], gastos: [], compras: []};

  constructor(private service: CuentaService, private route: ActivatedRoute, private router: Router,
     private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCuenta = params['id'];
      this.getCuenta();
    });
  }

  getCuenta(): void {
    this.service.getCuenta(this.idCuenta)
      .subscribe( cuenta => this.cuenta = cuenta);
  }

  verDetallesPedido(idPedido: number){
    this.router.navigate(['/pedido/'+idPedido]);
  }

  verDetallesPago(id: number){
    this.router.navigate(['/pago/'+id]);
  }

  verDetallesCompra(id: number){
    this.router.navigate(['/compra/'+id]);
  }

  volverAtras() {
    this.location.back();
  }
}
