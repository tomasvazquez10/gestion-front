import { Component } from '@angular/core';
import {ProveedorService} from "../../service/proveedor.service";
import {Proveedor} from "../../model/proveedor";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent {

  constructor(private proveedorService: ProveedorService, private  alertService: AlertService, private router: Router
              , private location: Location) {}

  proveedores: Proveedor[] = [];
  nuevoProveedor: Proveedor = {id: 0, nombre: '', nombreFantasia: '', direccion: '', cuit: '', telefono: '', email: '', saldo: 0};
  valor: string = '';
  mostrarPopup: boolean = false;
  campoSelec: String = '';
  campos = new Map();

  getProveedores(): void {
    this.proveedorService.getProveedores()
      .subscribe( proveedores => this.proveedores = proveedores);
  }

  buscarProveedores(): void {
    console.log(this.campoSelec);
    console.log(this.valor);
    this.proveedorService.buscarProveedores(this.campos.get(this.campoSelec), this.valor)
      .subscribe( proveedores => this.proveedores = proveedores);
  }

  ngOnInit(): void {
    this.setCampos();
    this.campoSelec = this.proveedorService.getCampo();
    this.valor = this.proveedorService.getValor();
    if(this.campoSelec === ''){
      this.getProveedores();
    }else{
      this.buscarProveedores()
    }
    this.setMostrarMensaje();
  }

  verDetalles(id: number) : void {
    this.router.navigate(['/proveedor/'+id]);
  }

  setCampos() : void {
    this.campos.set('Nombre','nombre');
    this.campos.set('Nombre Fantasia','nombre_fantasia');
    this.campos.set('CUIT','cuit');
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
