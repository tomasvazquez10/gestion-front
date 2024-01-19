import {Component, OnInit} from '@angular/core';
import {Compra} from "../../model/compra";
import {Articulo} from "../../model/articulo";
import {CompraService} from "../../service/compra.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmPopupService} from "../../service/confirm-popup.service";
import {Location} from "@angular/common";
import {Proveedor} from "../../model/proveedor";
import {ConfirmarBorrarService} from "../../service/confirmar-borrar.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit{

  compraId: string = '';
  proveedor = {} as Proveedor;
  articulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0, ventasTotales: 0 };
  compra: Compra = {idCompra: 0, articulo: this.articulo, fecha: new Date(), cantidad: 0, precioUnidad: 0, pago: false, cuitProveedor: '' };
  mostrarPopup: boolean = false;
  mostrarEntregado: boolean = false;
  mostrarConfirmBorrar: boolean = false;
  mostrarConfirmEntrega: boolean = false;
  mostrarError: boolean = false;

  constructor(private service: CompraService,private popUpService: ConfirmPopupService, private borrarService: ConfirmarBorrarService,
              private alertService: AlertService, private route: ActivatedRoute, private router: Router, private location: Location) {}

  getCompra(): void {
    this.service.getCompra(this.compraId)
      .subscribe( compra => this.compra = compra);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.compraId = params['id'];
      this.getCompra();
      this.setMostrarMensaje();
    });
  }
  mostrarConfirmPopup() {
    this.borrarService.setMensaje('¿Desea borrar la compra?');
    this.mostrarConfirmBorrar = true;
  }

  mostrarEntrega() {
    this.borrarService.setMensaje('¿Desea marcar la Compra como pagada?');
    this.mostrarConfirmEntrega = true;
  }

  ocultarConfirmPopup() {
    this.mostrarConfirmBorrar = false;
  }

  ocultarEntrega() {
    this.mostrarConfirmEntrega = false;
  }

  pagarCompra() {
    this.mostrarConfirmEntrega = false;
    this.service.pagarCompra(this.compraId).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          this.mostrarEntregado = true;
          this.compra.pago = true;
          this.alertService.setColorMensaje('green')
          setTimeout(() => {
            this.mostrarEntregado = false;
            this.alertService.setMostrarMensaje(false);
          }, 1500);
        }
        if (respuesta.status == 204){
          this.mostrarConfirmBorrar = false;
          this.popUpService.setMensaje('Error al pagar compra.');
          this.popUpService.setMostrarCancelar(false);
          this.mostrarError = true;

        }
      },
      (error) => {
        console.error('Error al eliminar el compra:', error);
      }
    );
  }

  volverAtras() {
    this.location.back();
  }

  borrarCompra() {
    this.service.borrarCompra(this.compraId).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          this.alertService.setMostrarMensaje(true);
          this.alertService.setColorMensaje('green');
          this.router.navigate(['/compras']);
        }
        if (respuesta.status == 204){
          this.mostrarConfirmBorrar = false;
          this.popUpService.setMensaje('Error al borrar compra. El stock ya fue utilizado.');
          this.popUpService.setMostrarCancelar(false);
          this.mostrarError = true;

        }
      },
      (error) => {
        console.error('Error al eliminar la compra:', error);
      }
    );
  }

  setMostrarMensaje() : void{
    this.mostrarPopup = this.alertService.getMostrarMensaje();
    if(this.mostrarPopup){

      setTimeout(() => {
        this.mostrarPopup = false;
        this.alertService.setMostrarMensaje(false);
      }, 1500);
    }
    this.alertService.setMostrarMensaje(false);
  }
}
