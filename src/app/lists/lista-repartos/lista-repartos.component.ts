import { Component } from '@angular/core';
import {Reparto} from "../../model/reparto";
import {Router} from "@angular/router";
import {RepartoService} from "../../service/reparto.service";
import {Location} from "@angular/common";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-lista-repartos',
  templateUrl: './lista-repartos.component.html',
  styleUrls: ['./lista-repartos.component.css']
})
export class ListaRepartosComponent {

  repartos: Reparto[] = [];
  valor: string = '';
  campoSelec: string = '';
  campos: string[] = [];
  mostrarPopup: boolean = false;

  constructor(private service: RepartoService, private alertService: AlertService,
              private router: Router, private location: Location) {}

  getRepartos(): void {
    this.service.getRepartos()
      .subscribe( repartos => this.repartos = repartos);
  }

  buscarRepartos(): void {
    console.log(this.campoSelec);
    console.log(this.valor);
    this.service.buscarReparto(this.campoSelec, this.valor)
      .subscribe( repartos => this.repartos = repartos);
  }

  ngOnInit(): void {
    this.campoSelec = this.service.getCampo();
    this.valor = this.service.getValor();
    if(this.campoSelec === ''){
      this.getRepartos();
    }else{
      this.buscarRepartos();
    }
    this.mostrarPopup = this.alertService.getMostrarMensaje();
    setTimeout(() => {
      this.mostrarPopup = false;
      this.alertService.setMostrarMensaje(false);
    }, 1500);
  }

  verDetalles(nroReparto: number) : void {
    this.router.navigate(['/reparto/'+nroReparto]);
  }

  volverAtras() {
    this.location.back();
  }

}
