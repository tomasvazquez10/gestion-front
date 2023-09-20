import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PedidoService} from "../service/pedido.service";
import {Pedido} from "../model/pedido";
import {ClienteService} from "../service/cliente.service";
import {Cliente} from "../model/cliente";

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent {

  idCliente: string = '';
  pedidos: Pedido[] = [];
  cliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: '', telefono: '' };
  estadoPedido: string = '';

  constructor(private pedidoService: PedidoService, private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCliente = params['id'];
      this.getPedidos();
    });
  }

  getPedidos(): void {
    console.log(this.cliente.dni);
    this.pedidoService.getPedidosByCliente(this.idCliente)
      .subscribe( pedidos => this.pedidos = pedidos);
    this.setPedidos();
  }

  setPedidos(): void {
    console.log('ok');
    const pedidosActualizados = this.pedidos.map(pedido => {
      console.log('ok2');
      switch (pedido.estado) {
        case 0:
          pedido.estadoPedido = 'Pedido Pendiente';
          break;
        case 1:
          pedido.estadoPedido = 'Pedido Enviado';
          break;
        case 2:
          pedido.estadoPedido = 'Pedido Entregado';
          break;
        default:
          pedido.estadoPedido = 'Estado Desconocido';
      }
      return pedido;
    });
    console.log(pedidosActualizados);
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/pedido/'+id]);
  }

  setEstado(estado: number) : string {
    console.log(estado);
    if (estado == 0){
      return  'PENDIENTE';
    }else if (estado == 1){
      return 'ENTREGADO';
    }else if (estado == 2){
      return 'PAGO';
    }else{
      return 'error';
    }
  }

}
