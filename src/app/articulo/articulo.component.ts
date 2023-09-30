import { Component } from '@angular/core';
import {Articulo} from "../model/articulo";
import {ArticuloService} from "../service/articulo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PrecioArticulo} from "../model/precioArticulo";
import {PrecioArticuloService} from "../service/precio-articulo.service";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent {
  articuloId: string = '';
  articulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0 };
  precioArticulo: PrecioArticulo = {idArticulo: 0, precio: 0, fecha: new Date(),};
  articuloEditado: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0, };
  camposEditables = false;
  valoresEditados: { [key: string]: any } = {};
  mostrarPopup: boolean = false;
  mostrarConfirmBorrar: boolean = false;

  constructor(private service: ArticuloService, private precioService: PrecioArticuloService, private route: ActivatedRoute, private router: Router) {}

  getArticulo(): void {
    this.service.getArticulo(this.articuloId)
      .subscribe( articulo => this.articulo = articulo);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.articuloId = params['id'];
      this.getArticulo();
    });
    this.mostrarPopup = this.service.getMostrarMensaje();
    setTimeout(() => {
      this.mostrarPopup = false;
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
    this.mostrarConfirmBorrar = true;
  }

  ocultarConfirmPopup() {
    this.mostrarConfirmBorrar = false;
  }

  guardarEdicion() {
    // Lógica para guardar los cambios editados
    console.log('entro');
    this.getArticuloEditado();
    if (this.articulo.precio !== this.articuloEditado.precio){
      this.actualizarPrecio();
    }
    this.service.editarArticulo(this.articuloEditado).subscribe(response => {
      console.log('Cliente editado:', response);
      this.camposEditables = false;
      this.valoresEditados = {};
      this.getArticulo();
    });

  }

  actualizarPrecio() {
    console.log("precios distintos");
    this.precioArticulo.idArticulo = this.articulo.id;
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
          this.service.setMostrarMensaje(true);
          this.service.setColorMensaje('red');
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
}
