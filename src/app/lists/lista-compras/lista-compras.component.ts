import { Component } from '@angular/core';
import {Compra} from "../../model/compra";
import {RepartoService} from "../../service/reparto.service";
import {Router} from "@angular/router";
import {CompraService} from "../../service/compra.service";
import {Location} from "@angular/common";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent {

  compras: Compra[] = [];
  mostrarPopup: boolean = false;

  constructor(private service: CompraService, private alertService: AlertService,
              private router: Router, private location: Location) {}

  getCompras(): void {
    this.service.getCompras()
      .subscribe( compras => this.compras = compras);
  }

  ngOnInit(): void {
    this.getCompras();
    this.setMostrarMensaje();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/compra/'+id]);
  }

  volverAtras() {
    this.location.back();
  }

  setMostrarMensaje() : void{
    this.mostrarPopup = this.alertService.getMostrarMensaje();
    if(this.mostrarPopup){

      setTimeout(() => {
        this.mostrarPopup = false;
        this.alertService.setMostrarMensaje(false);
      }, 1500);
    }
    this.alertService.setMostrarMensaje(false);
  }
}
