import { Component } from '@angular/core';
import { ClienteService } from "../service/cliente.service";
import {Cliente} from "../model/cliente";

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {

  constructor(private clienteService: ClienteService) {}

  clientes: Cliente[] = [];
  nuevoCliente: Cliente = {id: 0, nombre: '', nombre_fantasia: '', dni: '', direccion: '', email: '', nro_reparto: '', telefono: '' };

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => this.clientes = clientes);
  }

  ngOnInit(): void {
    this.getClientes();
  }


}
