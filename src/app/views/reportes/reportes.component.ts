import { Component } from '@angular/core';
import {Pago} from "../../model/pago";
import {ReporteService} from "../../service/reporte.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  pagos: Pago[] = [];
  opcionesComboBox1: string[] = ['Cliente', 'Proveedor', 'Pago', 'Reparto'];
  opcionesComboBox2: string[] = [];
  seleccionComboBox1: string = '';
  seleccionComboBox2: string = '';
  diaSemanaSelec: string = '';
  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  textoBusqueda: string = '';

  constructor(private service: ReporteService, private router: Router) {}

  onComboBox1Change() {
    if (this.seleccionComboBox1 === 'Cliente') {
      this.opcionesComboBox2 = ['', 'Nombre', 'Nombre Fantasia', 'Numero de reparto', 'DNI'];

    } else if (this.seleccionComboBox1 === 'Articulo') {
      this.opcionesComboBox2 = ['','Nombre', 'CUIT Proveedor'];

    } else if (this.seleccionComboBox1 === 'Pago') {
      this.opcionesComboBox2 = ['','Numero de reparto', 'DNI'];

    } else if (this.seleccionComboBox1 === 'Reparto') {
      this.opcionesComboBox2 = ['','Numero', 'Dia Semana'];

    } else {
      this.opcionesComboBox2 = [];
    }
  }

  buscar(): void {
    console.log(this.seleccionComboBox1 +" - "+this.seleccionComboBox2);
    console.log(this.textoBusqueda);
    if(this.seleccionComboBox1 === 'Pago'){
      if(this.seleccionComboBox2 === 'Numero de reparto'){
        this.service.getPagosByNroReparto(this.textoBusqueda).subscribe( pagos => this.pagos = pagos);
      }else if(this.seleccionComboBox2 === 'DNI'){
        this.service.getPagosByDniCliente(this.textoBusqueda).subscribe( pagos => this.pagos = pagos);
      }
    }
    console.log(this.pagos);
  }

  descargarPagos(): void {
    this.service.downloadPagosPDF(this.pagos).subscribe((pdfBlob: Blob) => {
      const blobURL = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = blobURL;
      a.download = 'Listado_pagos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobURL);
    });
  }

}
