import { Component } from '@angular/core';
import {ClienteService} from "../../service/cliente.service";
import {Router} from "@angular/router";
import {Cliente} from "../../model/cliente";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  opcionesComboBox1: string[] = ['Cliente', 'Proveedor', 'Articulo'];
  opcionesComboBox2: string[] = [];
  seleccionComboBox1: string = '';
  seleccionComboBox2: string = '';
  textoBusqueda: string = '';
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  onComboBox1Change() {
    // Aquí puedes definir la lógica para actualizar las opciones en ComboBox 2
    // según la selección en ComboBox 1.
    if (this.seleccionComboBox1 === 'Cliente') {
      this.opcionesComboBox2 = ['', 'Nombre', 'Nombre fantasia', 'Numero de reparto', 'DNI'];
    } else if (this.seleccionComboBox1 === 'Articulo') {
      this.opcionesComboBox2 = ['Subopción 2.1', 'Subopción 2.2', 'Subopción 2.3'];
    } else {
      // Otras opciones para ComboBox 1
      this.opcionesComboBox2 = [];
    }
  }

  buscar(): void {
    console.log(this.seleccionComboBox1);
    console.log(this.seleccionComboBox2);
    if(this.seleccionComboBox1 === 'Cliente'){
      if (this.seleccionComboBox2 === 'Nombre'){
        this.clienteService.buscarClientes('nombre', this.textoBusqueda)
          .subscribe( clientes => this.clientes = clientes);
        console.log(this.clientes);
        //this.clienteService.setClientes(this.clientes);

      }else if (this.seleccionComboBox2 === 'Nombre fantasia'){

      }else if (this.seleccionComboBox2 === 'Numero de reparto'){

      }else if (this.seleccionComboBox2 === 'DNI'){

      }else{

      }
    }
    this.router.navigate(['/clientes']);
  }

}
