import { Component } from '@angular/core';
import {ClienteService} from "../../service/cliente.service";
import {Router} from "@angular/router";
import {Cliente} from "../../model/cliente";
import {ArticuloService} from "../../service/articulo.service";
import {ProveedorService} from "../../service/proveedor.service";
import {RepartoService} from "../../service/reparto.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  opcionesComboBox1: string[] = ['Cliente', 'Proveedor', 'Articulo', 'Reparto'];
  opcionesComboBox2: string[] = [];
  seleccionComboBox1: string = '';
  seleccionComboBox2: string = '';
  diaSemanaSelec: string = '';
  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  textoBusqueda: string = '';
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private articuloSerivce: ArticuloService, private proveedorService: ProveedorService,
              private repartoService: RepartoService, private router: Router) {
  }

  onComboBox1Change() {
    if (this.seleccionComboBox1 === 'Cliente') {
      this.opcionesComboBox2 = ['', 'Nombre', 'Nombre Fantasia', 'Numero de reparto', 'DNI'];

    } else if (this.seleccionComboBox1 === 'Articulo') {
      this.opcionesComboBox2 = ['','Nombre', 'CUIT Proveedor'];

    } else if (this.seleccionComboBox1 === 'Proveedor') {
      this.opcionesComboBox2 = ['','Nombre', 'CUIT', 'Nombre Fantasia'];

    } else if (this.seleccionComboBox1 === 'Reparto') {
      this.opcionesComboBox2 = ['','Numero', 'Dia Semana'];

    } else {
      this.opcionesComboBox2 = [];
    }
  }

  buscar(): void {
    if(this.seleccionComboBox1 === 'Cliente'){
      this.clienteService.setCampoValor(this.seleccionComboBox2,this.textoBusqueda);
      this.router.navigate(['/clientes']);
    }
    if(this.seleccionComboBox1 === 'Articulo'){
      this.articuloSerivce.setCampoValor(this.seleccionComboBox2,this.textoBusqueda);
      this.router.navigate(['/articulos']);
    }
    if(this.seleccionComboBox1 === 'Proveedor'){
      this.proveedorService.setCampoValor(this.seleccionComboBox2,this.textoBusqueda);
      this.router.navigate(['/proveedores']);
    }
    if(this.seleccionComboBox1 === 'Reparto'){
      if(this.seleccionComboBox2 === 'Dia Semana'){
        this.textoBusqueda = this.diaSemanaSelec;
      }
      this.repartoService.setCampoValor(this.seleccionComboBox2,this.textoBusqueda);
      this.router.navigate(['/repartos']);
    }
  }

}
