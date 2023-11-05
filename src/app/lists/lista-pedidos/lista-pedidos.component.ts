import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PedidoService} from "../../service/pedido.service";
import {Pedido} from "../../model/pedido";
import {ClienteService} from "../../service/cliente.service";
import {Cliente} from "../../model/cliente";
import {Location} from "@angular/common";

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent {

  idCliente: string = '';
  pedidos: Pedido[] = [];
  cliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: 0, telefono: '', saldo: 0 };
  estadoPedido: string = '';

  constructor(private pedidoService: PedidoService, private clienteService: ClienteService,
              private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCliente = params['id'];
      this.getPedidos();
    });
  }

  getPedidos(): void {
    console.log(this.idCliente);
    if(this.idCliente){
      this.pedidoService.getPedidosByCliente(this.idCliente)
        .subscribe( pedidos => this.pedidos = pedidos);
    }else {
      this.pedidoService.getPedidos()
        .subscribe(pedidos => this.pedidos = pedidos);
    }

  }


  verDetalles(id: number) : void {
    this.router.navigate(['/pedido/'+id]);
  }

  volverAtras() {
    this.location.back();
  }

}
