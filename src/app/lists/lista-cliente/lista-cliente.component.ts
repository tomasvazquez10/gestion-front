import { Component } from '@angular/core';
import {Cliente} from "../../model/cliente";
import {ClienteService} from "../../service/cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {

  constructor(private clienteService: ClienteService, private router: Router) {}

  clientes: Cliente[] = [];
  //nuevoCliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: 0, telefono: '' };
  mostrarPopup = false;

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => this.clientes = clientes);
  }

  ngOnInit(): void {
    this.getClientes();
    this.setMostrarMensaje();

  }

  verDetalles(id: number) : void {
    this.router.navigate(['/cliente/'+id]);
  }

  setMostrarMensaje() : void{
    this.mostrarPopup = this.clienteService.getMostrarMensaje();
    if(this.mostrarPopup){

      setTimeout(() => {
        this.mostrarPopup = false;
      }, 1500);
    }
    this.clienteService.setMostrarMensaje(false);
  }


}
