import {Component, OnInit} from '@angular/core';
import {Pago} from "../model/pago";
import {PagoService} from "../service/pago.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.css']
})
export class AgregarPagoComponent implements OnInit{

  nuevoPago: Pago = { id: 0, fecha: new Date(), formaPago: '', monto: 0, descuento: 0, pedidoId: 0};
  pedidoId: number = 0;
  formaPagos: string[] = ['EFECTIVO','TRANSFERENCIA','TARJETA'];
  formaPagoSelec: string = '';

  constructor(private service: PagoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = params['id'];
    });
    console.log(this.pedidoId);
  }

  crearPago() {
    this.nuevoPago.pedidoId = this.pedidoId;
    this.nuevoPago.formaPago = this.formaPagoSelec;
    /*this.service.crearPago(this.nuevoPago).subscribe(response => {
      console.log('Pago creado:', response);
      //this.clientesService.setMostrarMensaje(true);
      this.router.navigate(['/pedido/'+response.id]);
    });
     */
    console.log(this.nuevoPago);
  }

  volverPagos(){
    this.router.navigate(['/pedido/'+this.pedidoId]);
  }
}
