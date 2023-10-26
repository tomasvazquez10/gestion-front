import { Component } from '@angular/core';
import {Pago} from "../../model/pago";
import {ReporteService} from "../../service/reporte.service";
import {Router} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {PedidoService} from "../../service/pedido.service";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  pagos: Pago[] = [];
  pedidos: Pedido[] = [];
  opcionesComboBox1: string[] = ['Articulo', 'Pago', 'Pedido', 'Factura'];
  opcionesComboBox2: string[] = [];
  seleccionComboBox1: string = '';
  seleccionComboBox2: string = '';
  diaSemanaSelec: string = '';
  fecha1: Date = new Date();
  fecha2: Date = new Date();
  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  textoBusqueda: string = '';
  mostrarTexto: boolean = false;
  mostrarFecha1: boolean = false;

  constructor(private service: ReporteService, private pedidoService: PedidoService, private router: Router) {}

  onComboBox1Change() {
    if (this.seleccionComboBox1 === 'Pedido') {
      this.opcionesComboBox2 = ['', 'Fecha', 'Entre dos fechas'];

    } else if (this.seleccionComboBox1 === 'Articulo') {
      this.opcionesComboBox2 = ['','Mas ventas', 'Mas ventas entre'];

    } else if (this.seleccionComboBox1 === 'Pago') {
      this.opcionesComboBox2 = ['','Numero de reparto', 'DNI'];

    }else if (this.seleccionComboBox1 === 'Factura') {
      this.opcionesComboBox2 = ['', 'Numero de pedido'];

    } else {
      this.opcionesComboBox2 = [];
    }
  }

  onComboBox2Change(){
    this.mostrarTexto = (this.seleccionComboBox2 === 'DNI'
                          || this.seleccionComboBox2 === 'Numero de reparto'
                          || this.seleccionComboBox2 === 'Numero de pedido');

    this.mostrarFecha1 = (this.seleccionComboBox2 === 'Fecha' || this.seleccionComboBox2 === 'Entre dos fechas');
  }

  buscar(): void {
    console.log(this.seleccionComboBox1 +" - "+this.seleccionComboBox2);
    if(this.seleccionComboBox1 === 'Pago'){
      if(this.seleccionComboBox2 === 'Numero de reparto'){
        this.service.getPagosByNroReparto(this.textoBusqueda).subscribe( pagos => this.pagos = pagos);
      }else if(this.seleccionComboBox2 === 'DNI'){
        this.service.getPagosByDniCliente(this.textoBusqueda).subscribe( pagos => this.pagos = pagos);
      }
    }else if(this.seleccionComboBox1 === 'Pedido'){
      if(this.seleccionComboBox2 === 'Fecha'){
        const fechaStr = this.fecha1.getDay()+"/"+this.fecha1.getMonth()+"/"+this.fecha1.getFullYear();
        this.service.getPedidosByFecha(fechaStr).subscribe( pedidos => this.pedidos = pedidos);
      } else if(this.seleccionComboBox2 === 'Entre dos fechas'){
        const fechaStr1 = this.fecha1.getDay()+"/"+this.fecha1.getMonth()+"/"+this.fecha1.getFullYear();
        const fechaStr2 = this.fecha2.getDay()+"/"+this.fecha2.getMonth()+"/"+this.fecha2.getFullYear();
        this.service.getPedidosEntreFechas(fechaStr1, fechaStr2).subscribe( pedidos => this.pedidos = pedidos);
      }
    }else if(this.seleccionComboBox1 === 'Factura'){
      if(this.seleccionComboBox2 === 'Numero de pedido'){
        console.log(this.textoBusqueda);
        this.pedidoService.existePedido(this.textoBusqueda).then((existe) => {
          if (existe) {
            this.descargarFactura();
          } else {
            alert('El Pedido ingresado no existe');
          }
          }).catch((error) => {
            console.error('Error al verificar Pedido:', error);
          });
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

  descargarFactura(): void {
    console.log('descargar factura');
    console.log(this.textoBusqueda);
    this.pedidoService.descargarFacturaPDF(this.textoBusqueda).subscribe((pdfBlob: Blob) => {
      const blobURL = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = blobURL;
      a.download = 'Factura.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobURL);
    });
  }

}
