import {Component, OnInit} from '@angular/core';
import {Reparto} from "../../model/reparto";
import {RepartoService} from "../../service/reparto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmPopupService} from "../../service/confirm-popup.service";
import {Location} from "@angular/common";
import {ConfirmarBorrarService} from "../../service/confirmar-borrar.service";
import {AlertService} from "../../service/alert.service";

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
  mostrarEliminado: boolean = false;
  mostrarConfirmBorrar: boolean = false;
  idReparto: number = 0;

  constructor(private service: RepartoService, private borrarService: ConfirmarBorrarService,
              private alertService: AlertService, private route: ActivatedRoute, private router: Router,
              private location: Location) {}

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
    const mostrar = this.alertService.getMostrarMensaje();
    if(mostrar){
      this.mostrarPopup = (this.alertService.getColorMensaje() === 'green');
      this.mostrarEliminado = (this.alertService.getColorMensaje() === 'red');
    }
    setTimeout(() => {
      this.mostrarPopup = false;
      this.mostrarEliminado = false;
      this.alertService.setMostrarMensaje(false);
    }, 1500);
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
    console.log(reparto.id);
    this.idReparto = reparto.id;
    this.borrarService.setMensaje('Desea borrar el Reparto?');
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
          this.alertService.setMostrarMensaje(true);
          this.alertService.setColorMensaje('red');
          this.mostrarConfirmBorrar = false;
          this.repartos = this.repartos.filter(reparto => reparto.id !== this.idReparto);
          if(this.repartos.length === 0){
            this.router.navigate(['/repartos']);
          }else{
            this.mostrarEliminado = true;
            setTimeout(() => {
              this.mostrarPopup = false;
              this.mostrarEliminado = false;
              this.alertService.setMostrarMensaje(false);
            }, 1500);
          }
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

  volverAtras() {
    this.location.back();
  }
}
