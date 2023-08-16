import { Component } from '@angular/core';
import { ClienteService } from "../service/cliente.service";
import {Cliente} from "../model/cliente";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  constructor(private clienteService: ClienteService) {}


  clientes: Cliente[] = [];

  selectedCliente?: Cliente;

  onSelect(cliente: Cliente): void {
    this.selectedCliente = cliente;
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => this.clientes = clientes);
  }

  ngOnInit(): void {
    this.getClientes();
  }
}
