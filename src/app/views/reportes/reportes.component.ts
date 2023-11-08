import { Component } from '@angular/core';
import {Pago} from "../../model/pago";
import {ReporteService} from "../../service/reporte.service";
import {Router} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {PedidoService} from "../../service/pedido.service";
import {Location} from "@angular/common";
import {Articulo} from "../../model/articulo";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  pagos: Pago[] = [];
  pedidos: Pedido[] = [];
  articulos: Articulo[] = [];
  pedido: Pedido ={ id: 0, fecha: new Date(), dniCliente: '', fechaStr: '',estado: 0, precioTotal: 0, estadoTexto: '', productos: [] }
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
  mostrarFecha2: boolean = false;
  mostrarSinResultados: boolean = false;

  constructor(private service: ReporteService, private pedidoService: PedidoService, private location: Location,
              private router: Router) {}

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
    this.mostrarTexto = false;
    this.mostrarFecha1 = false;
    this.mostrarFecha2 = false;
  }

  onComboBox2Change(){
    this.mostrarTexto = (this.seleccionComboBox2 === 'DNI'
                          || this.seleccionComboBox2 === 'Numero de reparto'
                          || this.seleccionComboBox2 === 'Numero de pedido');

    this.mostrarFecha1 = (this.seleccionComboBox2 === 'Fecha'
                          || this.seleccionComboBox2 === 'Entre dos fechas'
                          || this.seleccionComboBox2 === 'Mas ventas entre');

    this.mostrarFecha2 = (this.seleccionComboBox2 === 'Entre dos fechas'
                          || this.seleccionComboBox2 === 'Mas ventas entre')
  }

  setMostrarSinResultados() {
    this.mostrarSinResultados = true;
  }

  buscar(): void {
    console.log(this.seleccionComboBox1 +" - "+this.seleccionComboBox2);
    this.pedido.id = 0;
    this.pedidos = [];
    this.pagos = [];
    this.articulos = [];
    if(this.seleccionComboBox1 === 'Pago'){
      if(this.seleccionComboBox2 === 'Numero de reparto'){
        this.service.getPagosByNroReparto(this.textoBusqueda).subscribe( pagos => this.pagos = pagos);
      }else if(this.seleccionComboBox2 === 'DNI'){
        this.service.getPagosByDniCliente(this.textoBusqueda).subscribe( pagos => this.pagos = pagos);
      }
    }else if(this.seleccionComboBox1 === 'Pedido'){
      if(this.seleccionComboBox2 === 'Fecha'){
        this.service.getPedidosByFecha(this.fecha1.toString()).subscribe( pedidos => this.pedidos = pedidos);
      } else if(this.seleccionComboBox2 === 'Entre dos fechas'){
        if (this.fechasValidas()){
          this.service.getPedidosEntreFechas(this.fecha1.toString(), this.fecha2.toString()).subscribe( pedidos => this.pedidos = pedidos);
        }
      }
    }else if(this.seleccionComboBox1 === 'Factura'){
      if(this.seleccionComboBox2 === 'Numero de pedido'){
        console.log(this.textoBusqueda);
        this.pedidoService.existePedido(this.textoBusqueda).then((existe) => {
          if (existe) {
            this.pedidoService.getPedido(this.textoBusqueda).subscribe( pedido => this.pedido = pedido);
          }
          }).catch((error) => {
            console.error('Error al verificar Pedido:', error);
          });
      }
    }else if(this.seleccionComboBox1 === 'Articulo'){
      if(this.seleccionComboBox2 === 'Mas ventas'){
        this.service.getArticulosMasVendidos().subscribe( articulos => this.articulos = articulos);
      }else if(this.seleccionComboBox2 === 'Mas ventas entre' && this.fechasValidas()){
        this.service.getArticulosMasVendidosEntre(this.fecha1.toString(), this.fecha2.toString()).subscribe( articulos => this.articulos = articulos);
      }
    }
    this.setMostrarSinResultados();
    console.log(this.pedidos);
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

  descargarArticulos(): void {
    this.service.downloadArticulosPDF(this.articulos).subscribe((pdfBlob: Blob) => {
      const blobURL = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = blobURL;
      a.download = 'Listado_articulos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobURL);
    });
  }

  descargarPedidos(): void {
    this.service.downloadPedidosPDF(this.pedidos).subscribe((pdfBlob: Blob) => {
      const blobURL = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = blobURL;
      a.download = 'Listado_pedidos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobURL);
    });
  }

  descargarFactura(id: string): void {
    console.log('descargar factura');
    console.log(id);
    this.pedidoService.descargarFacturaPDF(id).subscribe((pdfBlob: Blob) => {
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

  fechasValidas() : boolean {
    console.log(this.fecha1);
    console.log(this.fecha2);
    if (this.fecha1 > this.fecha2){
      alert('El rango de fechas es incorrecto.');
      return false;
    }else {
      return true;
    }
  }

  volverAtras() {
    this.location.back();
  }

  verDetallePedido(id: number) : void {
    this.router.navigate(['/pedido/'+id]);
  }

}
