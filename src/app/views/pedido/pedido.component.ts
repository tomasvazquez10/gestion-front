import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {PedidoService} from "../../service/pedido.service";
import {Location} from "@angular/common";
import {ConfirmarBorrarService} from "../../service/confirmar-borrar.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  pedidoId: string = '';
  pedido: Pedido ={ id: 0, fecha: new Date(), dniCliente: '', fechaStr: '', estado: 0, precioTotal: 0, estadoTexto: '', productos: [] }
  mostrarPopup: boolean = false;
  mostrarCancel: boolean = false;
  mostrarEntregado: boolean = false;
  mostrarConfirmCancelar: boolean = false;
  mostrarConfirmEntrega: boolean = false;

  constructor(private pedidoService: PedidoService, private borrarService: ConfirmarBorrarService, private alertService: AlertService,
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
    this.mostrarPopup = this.alertService.getMostrarMensaje();
    setTimeout(() => {
      this.mostrarPopup = false;
      this.alertService.setMostrarMensaje(false);
    }, 1500);
    console.log(this.pedido);
  }
  mostrarEntrega() {
    this.borrarService.setMensaje('¿Desea marcar el Pedido como entregado?');
    this.mostrarConfirmEntrega = true;
  }

  mostrarConfirmPopup() {
    this.borrarService.setMensaje('¿Desea cancelar el Pedido?');
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
    this.pedidoService.editarPedido(this.pedido).subscribe(response => {

        //mostrar mensaje de cliente borrado
        //redigir a pantalla clientes
        this.pedidoService.setMostrarMensaje(true);
        this.pedidoService.setColorMensaje('red');
        this.mostrarConfirmEntrega = false;
        this.mostrarConfirmCancelar = false;
        //this.router.navigate(['/pedido/' + this.pedidoId]);

      }
    );
  }

  cancelarPedido(){
    this.pedido.estadoTexto = 'CANCELADO';
    this.editarPedido();
    this.mostrarCancel = true;
    this.alertService.setColorMensaje('red');
    setTimeout(() => {
      this.mostrarCancel = false;
      this.alertService.setMostrarMensaje(false);
    }, 1500);
  }

  cambiarEstado(){
    this.pedido.estado = 1;
    this.pedido.estadoTexto = 'ENTREGADO';
    this.editarPedido();
    this.mostrarEntregado = true;
    this.alertService.setColorMensaje('green')
    setTimeout(() => {
      this.mostrarEntregado = false;
      this.alertService.setMostrarMensaje(false);
    }, 1500);
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
