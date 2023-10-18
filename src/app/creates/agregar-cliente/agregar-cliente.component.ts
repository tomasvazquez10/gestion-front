import {Component, OnInit} from '@angular/core';
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

  constructor(private clientesService: ClienteService,private repartoService: RepartoService, private router: Router) {}

  crearNuevoCliente() {
    if(this.datosCorrectos()){
      this.clientesService.existeDNI(this.nuevoCliente.dni).then((existe) => {
        if (!existe) {
          this.nuevoCliente.nroReparto = this.nroReparto;
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

  datosCorrectos() : boolean {
    console.log();
    if (this.nuevoCliente.nombre === ''){
      alert('Debe completar el campo Nombre');
      return false;
    }else if (this.nuevoCliente.nombreFantasia === ''){
      alert('Debe completar el campo Nombre Fantasia');
      return false;
    }else if (this.nuevoCliente.direccion === ''){
      alert('Debe completar el campo Direccion');
      return false;
    }else if (this.nuevoCliente.dni === ''){
      alert('Debe completar el campo DNI');
      return false;
    }else if (!this.validarDNI((this.nuevoCliente.dni).toString().length)){
      alert('Debe ingresar un formato correcto de DNI');
      return false;
    }else if (this.nuevoCliente.email === ''){
      alert('Debe completar el campo Email');
      return false;
    }else if (!this.validarEmail(this.nuevoCliente.email)){
      alert('Debe ingresar un formato correcto de Email');
      return false;
    }else if (this.nroReparto === 0){
      alert('Debe completar el campo Numero de Reparto');
      return false;
    }else if (!this.validarNumero((this.nuevoCliente.telefono).toString().length)){
      alert('Debe ingresar un formato correcto de Telefono');
      return false;
    }else {
      return true;
    }
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  validarDNI(dni: number): boolean {
    return dni >= 7 && dni <= 8;
  }

  validarNumero(numero: number): boolean {
    return numero >= 10;
  }

  ngOnInit(): void {
    this.repartoService.getNroRepartos()
      .subscribe(nroRep => this.nroRepartos = nroRep);
  }
}
