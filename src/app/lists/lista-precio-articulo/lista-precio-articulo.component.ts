import { Component } from '@angular/core';
import {PrecioArticulo} from "../../model/precioArticulo";
import {PrecioArticuloService} from "../../service/precio-articulo.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lista-precio-articulo',
  templateUrl: './lista-precio-articulo.component.html',
  styleUrls: ['./lista-precio-articulo.component.css']
})
export class ListaPrecioArticuloComponent {

  idArticulo: string = '';
  precioArticulos: PrecioArticulo[] = [];

  constructor(private service: PrecioArticuloService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idArticulo = params['id'];
      this.getPrecios();
    });
  }

  getPrecios(): void {
    this.service.getPreciosByIdArticulo(this.idArticulo)
      .subscribe( precios => this.precioArticulos = precios);
  }

}
