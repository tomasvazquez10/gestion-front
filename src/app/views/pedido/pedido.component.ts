import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {PedidoService} from "../../service/pedido.service";
import {ConfirmPopupService} from "../../service/confirm-popup.service";
import {Location} from "@angular/common";

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
  mostrarConfirmEntrega: boolean = false;

  constructor(private pedidoService: PedidoService, private popUpService: ConfirmPopupService,
              private route: ActivatedRoute, private router: Router, private location: Location) {}

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
  mostrarEntrega() {
    this.popUpService.setMensaje('¿Desea marcar el Pedido como entregado?');
    this.mostrarConfirmEntrega = true;
  }

  mostrarConfirmPopup() {
    this.popUpService.setMensaje('¿Desea cancelar el Pedido?');
    this.mostrarConfirmCancelar = true;
  }
  ocultarConfirmPopup() {
    this.mostrarConfirmCancelar = false;
  }

  ocultarEntrega() {
    this.mostrarConfirmEntrega = false;
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
          this.mostrarConfirmEntrega = false;
          this.router.navigate(['/pedido/'+this.pedidoId]);
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

  cambiarEstado(){
    this.pedido.estado = 1;
    this.pedido.estadoTexto = 'ENTREGADO';
    this.editarPedido();
  }

  volverAtras() {
    this.location.back();
  }

  descargarFactura(): void {
    console.log('descargar factura');
    console.log(this.pedidoId);
    this.pedidoService.descargarFacturaPDF(this.pedidoId).subscribe((pdfBlob: Blob) => {
      const blobURL = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = blobURL;
      a.download = 'Factura.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobURL);
    });
  }
}
