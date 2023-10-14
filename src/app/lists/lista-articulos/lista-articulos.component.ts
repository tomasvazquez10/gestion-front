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
  valor: string = '';
  campoSelec: String = '';
  campos = new Map();

  constructor(private service: ArticuloService, private router: Router) {}

  getArticulos(): void {
    this.service.getArticulos()
      .subscribe( articulos => this.articulos = articulos);
  }

  buscarClientes(): void {
    this.service.buscarArticulos(this.campos.get(this.campoSelec), this.valor)
      .subscribe( articulos => this.articulos = articulos);
  }

  ngOnInit(): void {
    this.setCampos();
    this.campoSelec = this.service.getCampo();
    this.valor = this.service.getValor();
    if(this.campoSelec === ''){
      this.getArticulos();
    }else{
      this.buscarClientes();
    }
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/articulo/'+id]);
  }

  setCampos() : void {
    this.campos.set('Nombre','nombre');
    this.campos.set('CUIT Proveedor','cuit');
  }
}
