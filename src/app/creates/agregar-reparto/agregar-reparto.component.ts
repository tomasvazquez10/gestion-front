import { Component } from '@angular/core';
import {Reparto} from "../../model/reparto";
import {RepartoService} from "../../service/reparto.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-agregar-reparto',
  templateUrl: './agregar-reparto.component.html',
  styleUrls: ['./agregar-reparto.component.css']
})
export class AgregarRepartoComponent {

  nuevoReparto: Reparto = { id: 0, nroReparto: 0, diaSemana: '', zonaEntrega: '', editable: false}
  diasSemana: string[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  diaSemanaSelec = '';

  constructor(private service: RepartoService, private alertService: AlertService,
              private router: Router, private location: Location) {}

  crearReparto() {
    if (this.datosCorrectos()) {
      this.service.existeNroReparto(this.nuevoReparto.nroReparto).then((existe) => {
        if (!existe) {
          this.nuevoReparto.diaSemana = this.diaSemanaSelec;
          this.service.crearReparto(this.nuevoReparto).subscribe(response => {
            console.log('Reparto creado:', response);
            this.alertService.setMostrarMensaje(true);
            this.alertService.setColorMensaje('green');
            this.router.navigate(['/reparto/'+response.nroReparto]);
          });
        } else {
          alert('El Numero de Reparto ingresado ya existe');
        }
      }).catch((error) => {
        console.error('Error al verificar Nro Reparto:', error);
        // Manejar el error aquí si es necesario
      });
    }
  }

  datosCorrectos() : boolean {
    if (!this.validarNumero(this.nuevoReparto.nroReparto)){
      alert('Debe ingresar un Numero Reparto');
      return false;
    }else if (this.diaSemanaSelec === ''){
      alert('Debe ingresar un Dia de la semana');
      return false;
    }else if (this.nuevoReparto.zonaEntrega === ''){
      alert('Debe completar el campo Zona de Entrega');
      return false;
    }else {
      return true;
    }
  }

  validarNumero(numero: number): boolean {
    return numero > 0;
  }

  volverRepartos(){
    this.router.navigate(['/repartos']);
  }

  volverAtras() {
    this.location.back();
  }

}
