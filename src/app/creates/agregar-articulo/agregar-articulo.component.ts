import { Component } from '@angular/core';
import {Articulo} from "../../model/articulo";
import {Router} from "@angular/router";
import {ArticuloService} from "../../service/articulo.service";

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.css']
})
export class AgregarArticuloComponent {

  nuevoArticulo: Articulo = { id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0 };

  constructor(private service: ArticuloService, private router: Router) {}

  crearNuevoArticulo() {
    this.service.crearArticulo(this.nuevoArticulo).subscribe(response => {

      console.log('Articulo creado:', response);
      //this.service.setMostrarMensaje(true);
      this.router.navigate(['/articulo/'+response.id]);
    });
  }

  volverArticulo(){
    this.router.navigate(['/articulos']);
  }

}
