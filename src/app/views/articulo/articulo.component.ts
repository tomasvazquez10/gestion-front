import { Component } from '@angular/core';
import {Articulo} from "../../model/articulo";
import {ArticuloService} from "../../service/articulo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PrecioArticulo} from "../../model/precioArticulo";
import {PrecioArticuloService} from "../../service/precio-articulo.service";
import {ProveedorService} from "../../service/proveedor.service";
import {Location} from "@angular/common";
import {Proveedor} from "../../model/proveedor";
import {ConfirmarBorrarService} from "../../service/confirmar-borrar.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent {
  articuloId: string = '';
  proveedor = {} as Proveedor;
  articulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0, ventasTotales: 0 };
  precioArticulo: PrecioArticulo = {idArticulo: 0, precio: 0, fecha: new Date(), articulo: this.articulo};
  articuloEditado: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0, ventasTotales: 0};
  camposEditables = false;
  valoresEditados: { [key: string]: any } = {};
  mostrarPopup: boolean = false;
  mostrarConfirmBorrar: boolean = false;

  constructor(private service: ArticuloService, private provService: ProveedorService, private precioService: PrecioArticuloService,
              private borrarService: ConfirmarBorrarService, private alertService: AlertService, private route: ActivatedRoute,
              private router: Router, private location: Location) {}

  getArticulo(): void {
    this.service.getArticulo(this.articuloId)
      .subscribe( articulo => this.articulo = articulo);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articuloId = params['id'];
      this.getArticulo();
    });
    this.mostrarPopup = this.alertService.getMostrarMensaje();
    setTimeout(() => {
      this.mostrarPopup = false;
      this.alertService.setMostrarMensaje(false);
    }, 1500);
  }

  habilitarEdicion() {
    this.valoresEditados = { ...this.articulo };
    this.camposEditables = true;
  }

  desabilitarEdicion() {
    this.camposEditables = false;
  }

  mostrarConfirmPopup() {
    this.borrarService.setMensaje('Desea borrar el Articulo?');
    this.mostrarConfirmBorrar = true;
  }

  ocultarConfirmPopup() {
    this.mostrarConfirmBorrar = false;
  }

  guardarEdicion() {

    this.getArticuloEditado();
    if(this.service.datosCorrectos(this.articuloEditado)){
      console.log("editado: "+this.articuloEditado.nroArticulo);
      console.log("articulo: "+this.articulo.nroArticulo);
      this.service.existeNroArticulo(this.articuloEditado.nroArticulo).then((existeArt) => {
        if ((this.articulo.nroArticulo === this.articuloEditado.nroArticulo) || !existeArt) {
          this.provService.existeCUIT(this.articuloEditado.cuitProveedor).then((existe) => {
            if (existe) {
              if (this.articulo.precio !== this.articuloEditado.precio && this.articuloEditado.precio !== 0){
                this.actualizarPrecio();
              }
              this.service.editarArticulo(this.articuloEditado).subscribe(response => {
                console.log('Cliente editado:', response);
                this.camposEditables = false;
                this.valoresEditados = {};
                this.getArticulo();
              });
            } else {
              alert('El CUIT no existe, debe dar de alta el Proveedor');
            }
          }).catch((error) => {
            console.error('Error al verificar CUIT:', error);
          });
        } else {
          alert('El Numero Articulo ingresado ya existe');
        }
      }).catch((error) => {
        console.error('Error al verificar Articulo:', error);
      });
    }
  }

  actualizarPrecio() {
    console.log("precios distintos");
    this.precioArticulo.idArticulo = this.articulo.id;
    this.precioArticulo.articulo = this.articulo;
    this.precioArticulo.precio = +this.valoresEditados['precio'];
    console.log(this.precioArticulo);
    this.precioService.crearPrecio(this.precioArticulo).subscribe(response => {
      console.log(response);
    });

  }


  borrarArticulo() {
    this.service.borrarArticulo(this.articuloId).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          this.alertService.setMostrarMensaje(true);
          this.alertService.setColorMensaje('red');
          this.router.navigate(['/articulos']);
        }
      },
      (error) => {
        console.error('Error al eliminar el articulo:', error);
      }
    );
  }

  cancelarBorrado() {
    this.ocultarConfirmPopup();
  }

  getArticuloEditado(): void{
    this.articuloEditado.id = this.valoresEditados['id'];
    this.articuloEditado.nroArticulo = this.valoresEditados['nroArticulo'];
    this.articuloEditado.nombre = this.valoresEditados['nombre'];
    this.articuloEditado.descripcion = this.valoresEditados['descripcion'];
    this.articuloEditado.cuitProveedor = this.valoresEditados['cuitProveedor'];
    this.articuloEditado.stock = this.valoresEditados['stock'];
    this.articuloEditado.precio = this.valoresEditados['precio'];
  }

  volverAtras() {
    this.location.back();
  }
}
