import { Component } from '@angular/core';
import {Compra} from "../../model/compra";
import {RepartoService} from "../../service/reparto.service";
import {Router} from "@angular/router";
import {CompraService} from "../../service/compra.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent {

  compras: Compra[] = [];

  constructor(private service: CompraService, private router: Router, private location: Location) {}

  getCompras(): void {
    this.service.getCompras()
      .subscribe( compras => this.compras = compras);
  }

  ngOnInit(): void {
    this.getCompras();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/compra/'+id]);
  }

  volverAtras() {
    this.location.back();
  }
}
