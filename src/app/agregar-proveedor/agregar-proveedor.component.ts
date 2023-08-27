import { Component } from '@angular/core';
import {Proveedor} from "../model/proveedor";
import {ClienteService} from "../service/cliente.service";
import {Router} from "@angular/router";
import {ProveedorService} from "../service/proveedor.service";

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {

  nuevoProveedor: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: ''};

  constructor(private service: ProveedorService, private router: Router) {}

  crearNuevoProveedor() {
    // Enviar datos del nuevo cliente a la API
    this.service.crearProveedor(this.nuevoProveedor).subscribe(response => {

      console.log('Proveedor creado:', response);
      //this.service.setMostrarMensaje(true);
      this.router.navigate(['/proveedor/'+response.id]);
    });
  }

  volverProveedores(){
    this.router.navigate(['/proveedores']);
  }

}
