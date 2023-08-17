import {Component, OnInit} from '@angular/core';
import {Cuenta} from "../model/cuenta";
import {ActivatedRoute} from "@angular/router";
import {CuentaService} from "../service/cuenta.service";

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit{

  idUsuario: string = '';
  idCuenta: string = '';
  cuenta: Cuenta = {id: 0, idUsuario: "0", saldo: 0};
  nuevaCuenta: Cuenta = {id: 0, idUsuario: "0", saldo: 0};
  camposEditables = false;
  valoresEditados: { [key: string]: any } = {};

  constructor(private cuentaService: CuentaService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];
      this.getCuenta();
    });
  }

  getCuenta(): void {
    this.cuentaService.getCuenta(this.idUsuario)
      .subscribe( cuenta => this.cuenta = cuenta);
  }

  crearCuenta() {
    // Enviar datos del nuevo cliente a la API
    this.nuevaCuenta.idUsuario = this.idUsuario;
    this.cuentaService.crearCuenta(this.nuevaCuenta).subscribe(response => {
      console.log('Cuenta creada:', response);
      // Realizar acciones adicionales si es necesario
      //this.router.navigate(['/clientes']);
      this.cuenta.id = response.id;
      this.cuenta.idUsuario = response.idUsuario;
      this.cuenta.saldo = response.saldo;
    });
  }

  habilitarEdicion() {
    this.valoresEditados = { ...this.cuenta };
    this.camposEditables = true;
  }

  guardarEdicion() {
    // Lógica para guardar los cambios editados
    this.camposEditables = false;
    this.valoresEditados = {};
  }

}
