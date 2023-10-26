import {Component, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import { ClienteService } from "../../service/cliente.service";
import {Cliente} from "../../model/cliente";
import { Router } from '@angular/router';
import {RepartoService} from "../../service/reparto.service";
import {Reparto} from "../../model/reparto";

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})

export class AgregarClienteComponent implements OnInit{

  nuevoCliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: 0, telefono: '' };
  nroRepartos: number[] = [];
  nroReparto: number = 0;

  constructor(private clientesService: ClienteService,private repartoService: RepartoService, private router: Router, private location: Location) {}

  crearNuevoCliente() {
    this.nuevoCliente.nroReparto = this.nroReparto;
    if(this.clientesService.datosCorrectos(this.nuevoCliente)){
      this.clientesService.existeDNI(this.nuevoCliente.dni).then((existe) => {
        if (!existe) {
          this.clientesService.crearCliente(this.nuevoCliente).subscribe(response => {

            console.log('Cliente creado:', response);
            this.clientesService.setMostrarMensaje(true);
            this.router.navigate(['/cliente/'+response.id]);
          });
        } else {
          alert('El DNI ingresado ya existe');
        }
      }).catch((error) => {
        console.error('Error al verificar DNI:', error);
      });
    }
  }

  volverClientes(){
    this.router.navigate(['/clientes']);
  }

  ngOnInit(): void {
    this.repartoService.getNroRepartos()
      .subscribe(nroRep => this.nroRepartos = nroRep);
  }

  volverAtras() {
    this.location.back();
  }
}
