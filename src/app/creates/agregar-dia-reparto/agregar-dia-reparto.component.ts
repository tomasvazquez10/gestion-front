import {Component, OnInit} from '@angular/core';
import {Reparto} from "../../model/reparto";
import {RepartoService} from "../../service/reparto.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-agregar-dia-reparto',
  templateUrl: './agregar-dia-reparto.component.html',
  styleUrls: ['./agregar-dia-reparto.component.css']
})
export class AgregarDiaRepartoComponent implements OnInit{

  nuevoReparto: Reparto = { id: 0, nroReparto: 0, diaSemana: '', zonaEntrega: '', editable: false}
  diasSemana: String[] = [];
  diaSemanaSelec = '';

  constructor(private service: RepartoService, private router: Router, private route: ActivatedRoute) {}

  getDiasSemanaDisp() {
    this.service.getDiasSemanaDisponibles(this.nuevoReparto.nroReparto)
      .subscribe( diasSemana => this.diasSemana = diasSemana);
  }

  crearReparto() {
    if (this.datosCorrectos()) {
      this.nuevoReparto.diaSemana = this.diaSemanaSelec;
      this.service.crearReparto(this.nuevoReparto).subscribe(response => {
        console.log('Reparto creado:', response);
        this.router.navigate(['/reparto/'+response.nroReparto]);
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
    this.router.navigate(['/reparto/'+this.nuevoReparto.nroReparto]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nuevoReparto.nroReparto = params['id'];
    });
    this.getDiasSemanaDisp();
  }

}
