import { Component } from '@angular/core';
import {Proveedor} from "../../model/proveedor";
import {Router} from "@angular/router";
import {ProveedorService} from "../../service/proveedor.service";
import {Location} from "@angular/common";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {

  nuevoProveedor: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: '', saldo: 0};

  constructor(private service: ProveedorService, private alertService: AlertService,
              private router: Router, private location: Location) {}


  crearNuevoProveedor() {
    if (this.service.datosCorrectos(this.nuevoProveedor)) {
      this.service.existeCUIT(this.nuevoProveedor.cuit).then((existe) => {
        if (!existe) {
          this.service.crearProveedor(this.nuevoProveedor).subscribe((response) => {
            console.log('Proveedor creado:', response);
            this.alertService.setMostrarMensaje(true);
            this.alertService.setColorMensaje('green');
            console.log('Proveedor id:', response.id);
            this.router.navigate(['/proveedor/' + response.id]);
          });
        } else {
          alert('El CUIT ingresado ya existe');
        }
      }).catch((error) => {
        console.error('Error al verificar CUIT:', error);
      });
    }
  }

  volverProveedores(){
    this.router.navigate(['/proveedores']);
  }

  volverAtras() {
    this.location.back();
  }

}
