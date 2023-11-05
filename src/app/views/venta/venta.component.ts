import { Component } from '@angular/core';
import {Articulo} from "../../model/articulo";
import {Venta} from "../../model/venta";
import {Pago} from "../../model/pago";
import {Pedido} from "../../model/pedido";
import {VentaService} from "../../service/venta.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PedidoService} from "../../service/pedido.service";
import {PagoService} from "../../service/pago.service";

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent {
  pedidoId: string = '';
  pedido: Pedido = { id: 0, fecha: new Date(), dniCliente: '', fechaStr: '',estado: 0, precioTotal: 0, estadoTexto: '', productos: [] };
  pagos: Pago[] = [];

  constructor(private service: PagoService, private pedidoService: PedidoService, private route: ActivatedRoute, private router: Router) {}

  getPagos(): void {
    this.service.getPagosByIdPedido(this.pedidoId)
      .subscribe( pagos => this.pagos = pagos);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = params['id'];
      this.getPagos();
      this.getPedido();
    });
    console.log(this.pedido);

  }

  verDetalles(id: number) : void {
    this.router.navigate(['/pago/'+id]);
  }

  agregarPago() : void {
    this.router.navigate(['/agregar-pago/'+this.pedidoId]);
  }

  getPedido() : void {
    this.pedidoService.getPedido(this.pedidoId)
      .subscribe(pedido => this.pedido = pedido);
  }
}
