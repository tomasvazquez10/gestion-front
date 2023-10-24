import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProveedorService} from "../../service/proveedor.service";
import {Proveedor} from "../../model/proveedor";

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit{

  proveedorId: string = '';
  proveedor: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: ''};
  proveedorEditado: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: ''};
  camposEditables: boolean = false;
  valoresEditados: { [key: string]: any } = {};
  mostrarPopup: boolean = false;
  mostrarConfirmBorrar: boolean = false;

  constructor(private service: ProveedorService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proveedorId = params['id'];
      this.getProveedor();
    });
  }

  getProveedor(): void {
    this.service.getProveedor(this.proveedorId)
      .subscribe( proveedor => this.proveedor = proveedor);
  }

  habilitarEdicion() {
    this.valoresEditados = { ...this.proveedor };
    this.camposEditables = true;
  }

  desabilitarEdicion() {
    this.camposEditables = false;
  }

  guardarEdicion() {
    this.getProveedorEditado();
    if (this.service.datosCorrectos(this.proveedorEditado)) {
      this.service.existeCUIT(this.proveedorEditado.cuit).then((existe) => {
        if ((this.proveedor.cuit === this.proveedorEditado.cuit) || !existe) {
          this.service.editarProveedor(this.proveedorEditado).subscribe(response => {
            console.log('Proveedor editado:', response);
            this.camposEditables = false;
            this.valoresEditados = {};
            this.getProveedor();
          });
        } else {
          alert('El CUIT ingresado ya existe');
        }
      }).catch((error) => {
        console.error('Error al verificar CUIT:', error);
      });
    }
  }

  getProveedorEditado(): void{
    this.proveedorEditado.id = this.valoresEditados['id'];
    this.proveedorEditado.nombre = this.valoresEditados['nombre'];
    this.proveedorEditado.nombreFantasia = this.valoresEditados['nombreFantasia'];
    this.proveedorEditado.cuit = this.valoresEditados['cuit'];
    this.proveedorEditado.direccion = this.valoresEditados['direccion'];
    this.proveedorEditado.email = this.valoresEditados['email'];
    this.proveedorEditado.telefono = this.valoresEditados['telefono'];
  }

  mostrarConfirmPopup() {
    this.mostrarConfirmBorrar = true;
  }

  ocultarConfirmPopup() {
    this.mostrarConfirmBorrar = false;
  }

  cancelarBorrado() {
    this.ocultarConfirmPopup();
  }

  borrarProveedor() {
    this.service.borrarProveedor(this.proveedorId).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          //mostrar mensaje de cliente borrado
          //redigir a pantalla clientes
          this.service.setMostrarMensaje(true);
          this.service.setColorMensaje('red');
          this.router.navigate(['/proveedores']);
        }
      },
      (error) => {
        console.error('Error al eliminar el proveedor:', error);
      }
    );
  }

}
