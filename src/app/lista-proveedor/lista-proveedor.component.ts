import { Component } from '@angular/core';
import {ProveedorService} from "../service/proveedor.service";
import {Proveedor} from "../model/proveedor";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent {

  constructor(private proveedorService: ProveedorService, private router: Router) {}

  proveedores: Proveedor[] = [];
  nuevoProveedor: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: ''};

  getProveedores(): void {
    this.proveedorService.getProveedores()
      .subscribe( proveedores => this.proveedores = proveedores);
  }

  ngOnInit(): void {
    this.getProveedores();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/proveedor/'+id]);
  }

}
