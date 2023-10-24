import {Component, OnInit} from '@angular/core';
import {Articulo} from "../../model/articulo";
import {Router} from "@angular/router";
import {ArticuloService} from "../../service/articulo.service";
import {ProveedorService} from "../../service/proveedor.service";

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css']
})
export class AgregarArticuloComponent implements OnInit{

  nuevoArticulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0 };
  cuitsProveedores: string[] = [];
  sugerenciasFiltradas: string[] = [];
  cuitSelec: string = '';

  constructor(private service: ArticuloService, private proveedorService: ProveedorService, private router: Router) {}

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
    this.sugerenciasFiltradas = this.cuitsProveedores.filter(sugerencia =>
      sugerencia.toLowerCase().includes(this.nuevoArticulo.cuitProveedor.toLowerCase())
    );
  }

  seleccionarSugerencia(sugerencia: string) {
    this.nuevoArticulo.cuitProveedor = sugerencia;
    this.sugerenciasFiltradas = [];
  }

  ngOnInit(): void {
    this.getProveedores();
  }

}
