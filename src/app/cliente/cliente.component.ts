import {Component, OnInit} from '@angular/core';
import { ClienteService } from "../service/cliente.service";
import {Cliente} from "../model/cliente";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{

  clienteId: string = '';
  cliente: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: '', telefono: '' };
  clienteEditado: Cliente = {id: 0, nombre: '', nombreFantasia: '', dni: '', direccion: '', email: '', nroReparto: '', telefono: '' };
  camposEditables = false;
  valoresEditados: { [key: string]: any } = {};
  mostrarPopup: boolean = false;
  mostrarConfirmBorrar: boolean = false;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) {}

  getCliente(): void {
    this.clienteService.getCliente(this.clienteId)
      .subscribe( cliente => this.cliente = cliente);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteId = params['id'];
      this.getCliente();
    });
    this.mostrarPopup = this.clienteService.getMostrarMensaje();
    setTimeout(() => {
      this.mostrarPopup = false;
    }, 1500);
  }

  habilitarEdicion() {
    this.valoresEditados = { ...this.cliente };
    this.camposEditables = true;
  }

  desabilitarEdicion() {
    this.camposEditables = false;
  }

  mostrarConfirmPopup() {
    this.mostrarConfirmBorrar = true;
  }

  ocultarConfirmPopup() {
    this.mostrarConfirmBorrar = false;
  }

  guardarEdicion() {
    // Lógica para guardar los cambios editados
    console.log('entro');
    this.getClienteEditado();
    this.clienteService.editarCliente(this.clienteEditado).subscribe(response => {
      console.log('Cliente editado:', response);
      this.camposEditables = false;
      this.valoresEditados = {};
      this.getCliente();
    });

  }

  borrarCliente() {
    this.clienteService.borrarCliente(this.clienteId).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          //mostrar mensaje de cliente borrado
          //redigir a pantalla clientes
          this.clienteService.setMostrarMensaje(true);
          this.clienteService.setColorMensaje('red');
          this.router.navigate(['/clientes']);
        }
      },
      (error) => {
        console.error('Error al eliminar el cliente:', error);
      }
    );
  }

  cancelarBorrado() {
    this.ocultarConfirmPopup();
  }

  getClienteEditado(): void{
    this.clienteEditado.id = this.valoresEditados['id'];
    this.clienteEditado.nombre = this.valoresEditados['nombre'];
    this.clienteEditado.nombreFantasia = this.valoresEditados['nombreFantasia'];
    this.clienteEditado.dni = this.valoresEditados['dni'];
    this.clienteEditado.direccion = this.valoresEditados['direccion'];
    this.clienteEditado.email = this.valoresEditados['email'];
    this.clienteEditado.nroReparto = this.valoresEditados['nroReparto'];
    this.clienteEditado.telefono = this.valoresEditados['telefono'];
  }
}
