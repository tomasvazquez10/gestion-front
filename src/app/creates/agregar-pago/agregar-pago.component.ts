import {Component, OnInit} from '@angular/core';
import {Pago} from "../../model/pago";
import {PagoService} from "../../service/pago.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Venta} from "../../model/venta";
import {Location} from "@angular/common";
import {Pedido} from "../../model/pedido";
import {PedidoService} from "../../service/pedido.service";

@Component({
  selector: 'app-agregar-pago',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.css']
})
export class AgregarPagoComponent implements OnInit{
  venta = {} as Venta;
  nuevoPago: Pago = { id: 0, fecha: new Date(), formaPago: '', monto: 0, descuento: 0, idPedido: 0, dniCliente: ''};
  pedido: Pedido = { id: 0, fecha: new Date(), dniCliente: '', fechaStr: '',estado: 0, precioTotal: 0, estadoTexto: '', productos: [] };
  pedidoId: number = 0;
  formaPagos: string[] = ['EFECTIVO','TRANSFERENCIA','TARJETA'];
  formaPagoSelec: string = '';
  saldoPendiente: number = 0;

  constructor(private service: PagoService, private pedidoService: PedidoService, private router: Router,
              private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = params['id'];
    });
    this.getSaldoPendiente();
  }

  crearPago() {
    if (this.datosCorrectos()){
      this.nuevoPago.idPedido = this.pedidoId;
      this.nuevoPago.formaPago = this.formaPagoSelec;
      this.service.crearPago(this.nuevoPago).subscribe(response => {
        console.log('Pago creado:', response);
        //this.clientesService.setMostrarMensaje(true);
        this.router.navigate(['/pedido/'+this.pedidoId]);
      });
    }
  }

  datosCorrectos() : boolean {
    console.log(this.saldoPendiente);
    if(this.formaPagoSelec === ''){
      alert('Debe ingresar una Forma de Pago');
      return false;
    }else if(this.nuevoPago.monto <= 0){
      alert('Debe ingresar un monto');
      return false;
    }else if(this.nuevoPago.monto > this.saldoPendiente){
      alert('El monto ingresado supera al total del Pedido. El maximo a ingresar es $'+this.saldoPendiente);
      return false;
    }else if(this.nuevoPago.fecha <= this.pedido.fecha){
      console.log(this.nuevoPago.fecha);
      console.log(this.pedido.fecha);
      alert('La fecha no puede ser menor a la del pedido.');
      return false;
    }else {
      return true;
    }
  }

  getSaldoPendiente() : void {
    this.service.getSaldoPendiente(''+this.pedidoId).
      subscribe( saldo => this.saldoPendiente = saldo);
  }

  getPedido() : void {
    this.pedidoService.getPedido(''+this.pedidoId)
      .subscribe(pedido => this.pedido = pedido);
  }

  volverPagos(){
    this.router.navigate(['/pedido/'+this.pedidoId]);
  }

  volverAtras() {
    this.location.back();
  }
}
