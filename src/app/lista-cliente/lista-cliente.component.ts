import { Component } from '@angular/core';
import {Cliente} from "../model/cliente";
import {ClienteService} from "../service/cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {

  constructor(private clienteService: ClienteService, private router: Router) {}

  clientes: Cliente[] = [];
  nuevoCliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: '', telefono: '' };

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => this.clientes = clientes);
  }

  ngOnInit(): void {
    this.getClientes();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/cliente/'+id]);
  }


}
