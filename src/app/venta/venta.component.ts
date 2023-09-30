import { Component } from '@angular/core';
import {Articulo} from "../model/articulo";
import {Venta} from "../model/venta";
import {Pago} from "../model/pago";
import {Pedido} from "../model/pedido";
import {VentaService} from "../service/venta.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent {
  pedidoId: string = '';
  pedido: Pedido = { id: 0, fecha: new Date(), dniCliente: '', estado: 0, precioTotal: 0, estadoTexto: '', productos: [] };
  venta: Venta = { id: 0, pedido: this.pedido, pagos: [] };

  constructor(private service: VentaService,  private route: ActivatedRoute, private router: Router) {}

  getVenta(): void {
    this.service.getVentaByPedidoId(this.pedidoId)
      .subscribe( venta => this.venta = venta);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = params['id'];
      this.getVenta();
    });
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/pago/'+id]);
  }

  agregarPago() : void {
    this.router.navigate(['/agregar-pago/'+this.pedidoId]);
  }
}
