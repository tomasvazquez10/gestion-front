import { Component } from '@angular/core';
import {Proveedor} from "../../model/proveedor";
import {Router} from "@angular/router";
import {ProveedorService} from "../../service/proveedor.service";

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent {

  nuevoProveedor: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: ''};

  constructor(private service: ProveedorService, private router: Router) {}


  crearNuevoProveedor() {
    if (this.datosCorrectos()) {
      this.service.existeCUIT(this.nuevoProveedor.cuit).then((existe) => {
        if (!existe) {
          this.service.crearProveedor(this.nuevoProveedor).subscribe((response) => {
            console.log('Proveedor creado:', response);
            this.router.navigate(['/proveedor/' + response.id]);
          });
        } else {
          alert('El CUIT ingresado ya existe');
        }
      }).catch((error) => {
        console.error('Error al verificar CUIT:', error);
        // Manejar el error aquí si es necesario
      });
    }
  }


  datosCorrectos() : boolean {
    if (this.nuevoProveedor.nombre === ''){
      alert('Debe completar el campo Nombre');
      return false;
    }else if (this.nuevoProveedor.nombreFantasia === ''){
      alert('Debe completar el campo Nombre Fantasia');
      return false;
    }else if (this.nuevoProveedor.direccion === ''){
      alert('Debe completar el campo Direccion');
      return false;
    }else if (this.nuevoProveedor.cuit === ''){
      alert('Debe completar el campo CUIT');
      return false;
    }else if (!this.validarCUIT((this.nuevoProveedor.cuit).toString().length)){
      alert('Debe ingresar un formato correcto de CUIT');
      return false;
    }else if (this.nuevoProveedor.email === ''){
      alert('Debe completar el campo Email');
      return false;
    }else if (!this.validarEmail(this.nuevoProveedor.email)){
      alert('Debe ingresar un formato correcto de Email');
      return false;
    }else if (!this.validarNumero((this.nuevoProveedor.telefono).toString().length)){
      alert('Debe ingresar un formato correcto de Telefono');
      return false;
    }else {
      return true;
    }
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  validarCUIT(cuit: number): boolean {
    return cuit == 11;
  }

  validarNumero(numero: number): boolean {
    return numero >= 10;
  }

  volverProveedores(){
    this.router.navigate(['/proveedores']);
  }

}
