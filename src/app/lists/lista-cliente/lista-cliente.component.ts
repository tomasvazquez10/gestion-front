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
  mostrarPopup = false;
  valor: String = '';
  campoSelec: String = '';
  campos = new Map();

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => this.clientes = clientes);
  }

  buscarClientes(): void {
    console.log(this.campoSelec);
    console.log(this.valor);
    this.clienteService.buscarClientes(this.campos.get(this.campoSelec), this.valor)
      .subscribe( clientes => this.clientes = clientes);
  }

  ngOnInit(): void {
    this.getClientes();
    this.setMostrarMensaje();
    this.setCampos();
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

  setCampos() : void {
    this.campos.set('Nombre','nombre');
    this.campos.set('Nombre Fantasia','nombre_fantasia');
    this.campos.set('DNI','dni');
    this.campos.set('Numero de reparto','nro_reparto');
  }

  getListadoPDF() : void {
    this.clienteService.getListadoPDF(this.clientes)
      .subscribe();
  }

}