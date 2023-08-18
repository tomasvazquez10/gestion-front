import { Component } from '@angular/core';
import { ClienteService } from "../service/cliente.service";
import {Cliente} from "../model/cliente";
import { Router } from '@angular/router';
import {ClienteComponent} from "../cliente/cliente.component";


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent {
  nuevoCliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: '', telefono: '' };

  constructor(private clientesService: ClienteService, private router: Router) {}

  crearNuevoCliente() {
    // Enviar datos del nuevo cliente a la API
    this.clientesService.crearCliente(this.nuevoCliente).subscribe(response => {

      console.log('Cliente creado:', response);
      this.clientesService.setMostrarMensaje(true);
      this.router.navigate(['/cliente/'+response.id]);
    });
  }

  volverClientes(){
    this.router.navigate(['/clientes']);
  }
}
