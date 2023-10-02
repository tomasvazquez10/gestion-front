import { Component } from '@angular/core';
import {Articulo} from "../../model/articulo";
import {Router} from "@angular/router";
import {ArticuloService} from "../../service/articulo.service";

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent {

  articulos: Articulo[] = [];

  constructor(private service: ArticuloService, private router: Router) {}

  getArticulos(): void {
    this.service.getArticulos()
      .subscribe( articulos => this.articulos = articulos);
  }

  ngOnInit(): void {
    this.getArticulos();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/articulo/'+id]);
  }

}
