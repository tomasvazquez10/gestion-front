import { Component } from '@angular/core';
import {Reparto} from "../../model/reparto";
import {RepartoService} from "../../service/reparto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agregar-reparto',
  templateUrl: './agregar-reparto.component.html',
  styleUrls: ['./agregar-reparto.component.css']
})
export class AgregarRepartoComponent {

  nuevoReparto: Reparto = { id: 0, nroReparto: 0, diaSemana: '', zonaEntrega: '', editable: false}
  diasSemana: string[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  diaSemanaSelec = '';

  constructor(private service: RepartoService, private router: Router) {}

  crearReparto() {
    this.nuevoReparto.diaSemana = this.diaSemanaSelec;
    this.service.crearReparto(this.nuevoReparto).subscribe(response => {

      console.log('Reparto creado:', response);
      //this.service.setMostrarMensaje(true);
      this.router.navigate(['/reparto/'+response.id]);
    });
  }

  volverRepartos(){
    this.router.navigate(['/repartos']);
  }

}
