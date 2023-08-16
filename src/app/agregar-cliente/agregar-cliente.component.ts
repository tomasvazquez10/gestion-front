import { Component } from '@angular/core';
import { ClienteService } from "../service/cliente.service";
import {Cliente} from "../model/cliente";


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent {
  nuevoCliente: Cliente = {id: 0, nombre: '', nombre_fantasia: '', dni: '', direccion: '', email: '', nro_reparto: '', telefono: '' };

  constructor(private clientesService: ClienteService) {}

  crearNuevoCliente() {
    // Enviar datos del nuevo cliente a la API
    this.clientesService.crearCliente(this.nuevoCliente).subscribe(response => {
      console.log('Cliente creado:', response);
      // Realizar acciones adicionales si es necesario
    });
  }
}
