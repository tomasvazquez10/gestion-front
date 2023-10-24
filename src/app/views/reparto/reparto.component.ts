import {Component, OnInit} from '@angular/core';
import {Reparto} from "../../model/reparto";
import {RepartoService} from "../../service/reparto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmPopupService} from "../../service/confirm-popup.service";

@Component({
  selector: 'app-reparto',
  templateUrl: './reparto.component.html',
  styleUrls: ['./reparto.component.css']
})
export class RepartoComponent implements OnInit{

  nroReparto: number = 0;
  repartos: Reparto[] = [];
  diasSemanaDisp: String[] = [];
  mostrarPopup: boolean = false;
  mostrarConfirmBorrar: boolean = false;
  idReparto: number = 0;

  constructor(private service: RepartoService, private popupService: ConfirmPopupService, private route: ActivatedRoute, private router: Router) {}

  getRepartosByNro() {
    this.service.getRepartosByNro(this.nroReparto)
      .subscribe( repartos => this.repartos = repartos);
  }

  getDiasSemanaDisp() {
    this.service.getDiasSemanaDisponibles(this.nroReparto)
      .subscribe( diasSemana => this.diasSemanaDisp = diasSemana);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nroReparto = params['nroReparto'];
      this.getRepartosByNro();
      this.getDiasSemanaDisp();
    });
  }

  guardarCambios(reparto: Reparto): void {
    console.log(reparto);
    this.service.editarReparto(reparto).subscribe(response => {
      console.log('Reparto editado:', response);
      this.getDiasSemanaDisp();
    });
    reparto.editable = false;

  }

  confirmBorrar(reparto: Reparto): void {
    this.mostrarConfirmBorrar = true;
    this.idReparto = reparto.id;
    this.popupService.setMensaje('Desea borrar el Reparto?');
  }

  habilitarEdit(reparto: Reparto): void {
    reparto.editable = true;
    this.diasSemanaDisp.push(reparto.diaSemana);
  }

  cancelarEdit(reparto: Reparto): void {
    this.diasSemanaDisp.pop();
    reparto.editable = false;
  }

  borrarReparto(): void {
    this.service.borrarReparto(this.idReparto).subscribe(
      (respuesta) => {
        console.log(respuesta);
        console.log(respuesta.status);
        if (respuesta.status == 200){
          this.service.setMostrarMensaje(true);
          this.service.setColorMensaje('red');
          this.mostrarConfirmBorrar = false;
          this.repartos = this.repartos.filter(reparto => reparto.id !== this.idReparto);
        }
      },
      (error) => {
        console.error('Error al eliminar el reparto:', error);
      }
    );
  }

  cancelarBorrado(): void {
    this.mostrarConfirmBorrar = false;
  }

  crearDiaReparto() : void {
    this.router.navigate(['/agregar-dia-reparto/'+this.nroReparto]);
  }
}
