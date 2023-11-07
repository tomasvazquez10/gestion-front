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
  compra: Compra = {id: 0, articulo: this.articulo, fecha: new Date(), cantidad: 0, precioUnidad: 0 };
  mostrarPopup: boolean = false;
  mostrarConfirmBorrar: boolean = false;
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

  ocultarConfirmPopup() {
    this.mostrarConfirmBorrar = false;
  }

  borrarCompra() {
    this.service.borrarCompra(this.compraId).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          this.alertService.setMostrarMensaje(true);
          this.alertService.setColorMensaje('red');
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
        console.error('Error al eliminar el articulo:', error);
      }
    );
  }

  volverAtras() {
    this.location.back();
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
