import { Component } from '@angular/core';
import {Reparto} from "../../model/reparto";
import {ArticuloService} from "../../service/articulo.service";
import {Router} from "@angular/router";
import {RepartoService} from "../../service/reparto.service";

@Component({
  selector: 'app-lista-repartos',
  templateUrl: './lista-repartos.component.html',
  styleUrls: ['./lista-repartos.component.css']
})
export class ListaRepartosComponent {

  repartos: Reparto[] = [];

  constructor(private service: RepartoService, private router: Router) {}

  getRepartos(): void {
    this.service.getRepartos()
      .subscribe( repartos => this.repartos = repartos);
  }

  ngOnInit(): void {
    this.getRepartos();
  }

  verDetalles(nroReparto: number) : void {
    this.router.navigate(['/reparto/'+nroReparto]);
  }
}
