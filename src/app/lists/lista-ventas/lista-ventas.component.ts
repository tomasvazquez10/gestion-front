import { Component } from '@angular/core';
import {Venta} from "../../model/venta";
import {RepartoService} from "../../service/reparto.service";
import {Router} from "@angular/router";
import {VentaService} from "../../service/venta.service";

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent {

  ventas: Venta[] = [];

  constructor(private service: VentaService, private router: Router) {}

  getVentas(): void {
    this.service.getVentas()
      .subscribe( ventas => this.ventas = ventas);
  }

  ngOnInit(): void {
    this.getVentas();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/venta/'+id]);
  }

}
