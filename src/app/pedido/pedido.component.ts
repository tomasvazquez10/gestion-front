import { Component } from '@angular/core';
import {Cliente} from "../model/cliente";
import {ClienteService} from "../service/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pedido} from "../model/pedido";
import {PedidoService} from "../service/pedido.service";
import {Producto} from "../model/producto";
import {Proveedor} from "../model/proveedor";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  pedidoId: string = '';
  pedido: Pedido ={ id: 0, fecha: new Date(), dniCliente: '', estado: 0, precioTotal: 0, estadoTexto: '', productos: [] }
  mostrarPopup: boolean = false;
  mostrarConfirmCancelar: boolean = false;

  constructor(private pedidoService: PedidoService, private route: ActivatedRoute, private router: Router) {}

  getPedido(): void {
    this.pedidoService.getPedido(this.pedidoId)
      .subscribe( pedido => this.pedido = pedido);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = params['id'];
      this.getPedido();
    });
    /*
    this.mostrarPopup = this.clienteService.getMostrarMensaje();
    setTimeout(() => {
      this.mostrarPopup = false;
    }, 1500);
     */
    console.log(this.pedido);
  }

  mostrarConfirmPopup() {
    this.mostrarConfirmCancelar = true;
  }
  ocultarConfirmPopup() {
    this.mostrarConfirmCancelar = false;
  }
  cancelarBorrado() {
    this.ocultarConfirmPopup();
  }

  editarPedido() {
    this.pedidoService.editarPedido(this.pedido).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          //mostrar mensaje de cliente borrado
          //redigir a pantalla clientes
          this.pedidoService.setMostrarMensaje(true);
          this.pedidoService.setColorMensaje('red');
          this.router.navigate(['/clientes']);
        }
      },
      (error) => {
        console.error('Error al eliminar el pedido:', error);
      }
    );
  }

  cancelarPedido(){
    if (this.pedido.estado == 0){
      this.editarPedido();
    }else {
      alert("No se puede cancelar el pedido");
    }
  }

  crearPago(){

  }
}
