import {Component, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import {Articulo} from "../../model/articulo";
import {Router} from "@angular/router";
import {ArticuloService} from "../../service/articulo.service";
import {ProveedorService} from "../../service/proveedor.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css']
})
export class AgregarArticuloComponent implements OnInit{

  nuevoArticulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0, ventasTotales: 0 };
  cuitsProveedores: string[] = [];
  sugerenciasFiltradas: string[] = [];
  cuitSelec: string = '';

  constructor(private service: ArticuloService, private proveedorService: ProveedorService, private alertService: AlertService,
              private router: Router, private location: Location) {}

  getProveedores(): void {
    this.proveedorService.getProveedores()
      .subscribe( proveedores => {
        this.cuitsProveedores = proveedores.map(prov => prov.cuit);
      });
  }

  crearNuevoArticulo() {
    if (this.service.datosCorrectos(this.nuevoArticulo)){
      this.service.existeNroArticulo(this.nuevoArticulo.nroArticulo).then((existeArt) => {
        if (!existeArt) {
          this.proveedorService.existeCUIT(this.nuevoArticulo.cuitProveedor).then((existe) => {
            if (existe) {
              this.service.crearArticulo(this.nuevoArticulo).subscribe(response => {

                console.log('Articulo creado:', response);
                this.alertService.setMostrarMensaje(true);
                this.alertService.setColorMensaje('green');
                this.router.navigate(['/articulo/'+response.id]);
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

  volverArticulo(){
    this.router.navigate(['/articulos']);
  }

  filtrarSugerencias() {
    const max = 5;
    this.sugerenciasFiltradas = this.cuitsProveedores.filter(sugerencia =>
      sugerencia.toLowerCase().startsWith(this.nuevoArticulo.cuitProveedor.toLowerCase())
    ).slice(0, max);
  }

  seleccionarSugerencia(sugerencia: string) {
    this.nuevoArticulo.cuitProveedor = sugerencia;
    this.sugerenciasFiltradas = [];
  }

  ngOnInit(): void {
    this.getProveedores();
  }

  volverAtras() {
    this.location.back();
  }

}
