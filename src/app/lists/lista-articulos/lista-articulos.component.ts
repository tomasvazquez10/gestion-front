import { Component } from '@angular/core';
import { Location } from "@angular/common";
import {Articulo} from "../../model/articulo";
import {Router} from "@angular/router";
import {ArticuloService} from "../../service/articulo.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent {

  articulos: Articulo[] = [];
  valor: string = '';
  campoSelec: String = '';
  mostrarPopup: boolean = false;
  campos = new Map();

  constructor(private service: ArticuloService, private alertService: AlertService, private router: Router,
              private location: Location) {}

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
    this.setMostrarMensaje();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/articulo/'+id]);
  }

  setCampos() : void {
    this.campos.set('Nombre','nombre');
    this.campos.set('CUIT Proveedor','cuit');
  }

  descargarPDF(): void {
    this.service.downloadPDF(this.articulos).subscribe((pdfBlob: Blob) => {
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
