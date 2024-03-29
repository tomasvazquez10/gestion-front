import {Component, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import {Compra} from "../../model/compra";
import {CompraService} from "../../service/compra.service";
import {Router} from "@angular/router";
import {Articulo} from "../../model/articulo";
import {ArticuloService} from "../../service/articulo.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-agregar-compra',
  templateUrl: './agregar-compra.component.html',
  styleUrls: ['./agregar-compra.component.css']
})
export class AgregarCompraComponent implements OnInit{

  articulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0, ventasTotales: 0 };
  compra: Compra = { idCompra: 0, articulo: this.articulo, fecha: new Date(), cantidad: 0, precioUnidad: 0, pago: false, cuitProveedor: '' };
  fecha: Date = new Date();
  articulos: Articulo[] = [];

  constructor(private service: CompraService, private articuloService: ArticuloService, private alertService: AlertService,
              private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getArticulos();
    const nuevaFecha = new Date();

  }

  getArticulos(): void {
    this.articuloService.getArticulos()
      .subscribe( articulos => this.articulos = articulos);
  }

  crearNuevaCompra() {
    if (this.datosCorrectos()){
      this.compra.articulo = this.articulo;
      this.compra.cuitProveedor = this.articulo.cuitProveedor;
      console.log(this.compra);
      this.service.crearCompra(this.compra).subscribe(response => {

        console.log('Compra creada:', response);
        this.alertService.setColorMensaje('green');
        this.alertService.setMostrarMensaje(true);
        this.router.navigate(['/compra/'+response.idCompra]);
      });
    }
  }

  volverCompras() {
    this.router.navigate(['/compras']);
  }

  datosCorrectos() : boolean {
    console.log(this.compra.fecha);
    if (this.articulo.nombre === ''){
      alert('Debe seleccionar un Articulo');
      return false;
    }else if (this.validarFecha(this.compra.fecha)){
      alert('Debe ingresar una fecha correcta.');
      return false;
    }else if (!this.validarNumero(this.compra.precioUnidad)){
      alert('Debe ingresar un valor en Precio Unidad');
      return false;
    }else if (!this.validarNumero(this.compra.cantidad)){
      alert('Debe ingresar un valor en Cantidad');
      return false;
    }else {
      return true;
    }
  }

  validarNumero(numero: number) : boolean {
    return numero > 0;
  }

  validarFecha(fecha: Date) : boolean{
    const fechaHoy = new Date();
    const [year, month, day] = fecha.toString().split('-').map(Number);
    const fechaFormat = new Date(year, month - 1, day);
    return (fechaFormat > fechaHoy);
  }

  volverAtras() {
    this.location.back();
  }
}
