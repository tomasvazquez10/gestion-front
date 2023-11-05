import { Component } from '@angular/core';
import {Cliente} from "../../model/cliente";
import {ClienteService} from "../../service/cliente.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent {

  constructor(private clienteService: ClienteService, private router: Router, private location: Location) {}

  clientes: Cliente[] = [];
  mostrarPopup = false;
  valor: string = '';
  campoSelec: string = '';
  campos = new Map();

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => this.clientes = clientes);
  }

  buscarClientes(): void {
    console.log(this.campoSelec);
    console.log(this.valor);
    this.clienteService.buscarClientes(this.campos.get(this.campoSelec), this.valor)
      .subscribe( clientes => this.clientes = clientes);
  }

  ngOnInit(): void {
    this.setCampos();
    this.campoSelec = this.clienteService.getCampo();
    this.valor = this.clienteService.getValor();
    if(this.clienteService.getCampo() !== ''){
      console.log("busco "+this.valor+" - "+this.campoSelec);
       this.buscarClientes();
    }else{
      this.getClientes();
    }
    this.setMostrarMensaje();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/cliente/'+id]);
  }

  setMostrarMensaje() : void{
    this.mostrarPopup = this.clienteService.getMostrarMensaje();
    if(this.mostrarPopup){

      setTimeout(() => {
        this.mostrarPopup = false;
      }, 1500);
    }
    this.clienteService.setMostrarMensaje(false);
  }

  setCampos() : void {
    this.campos.set('Nombre','nombre');
    this.campos.set('Nombre Fantasia','nombre_fantasia');
    this.campos.set('DNI','dni');
    this.campos.set('Numero de reparto','nro_reparto');
  }

  descargarPDF(): void {
    console.log('llamo desc PDF');
    this.clienteService.downloadPDF(this.clientes).subscribe((pdfBlob: Blob) => {
      const blobURL = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = blobURL;
      a.download = 'Listado_clientes.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobURL);
    });
  }
  volverAtras() {
    this.location.back();
  }
}
