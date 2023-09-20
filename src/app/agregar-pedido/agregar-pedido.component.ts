import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Pedido} from "../model/pedido";
import {PedidoService} from "../service/pedido.service";
import {Producto} from "../model/producto";
import {ProductoService} from "../service/producto.service";
import {Articulo} from "../model/articulo";
import {ClienteService} from "../service/cliente.service";

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent {

  nuevoPedido: Pedido = {id: 0, fecha: new Date(), dniCliente: '', estado: 0, precioTotal: 0, estadoPedido: '', productos: []};
  productosSelec: Producto[] = [];
  articulos: Articulo[] = [];
  dniCliente: string = '';
  sugerenciasFiltradas: string[] = [];
  dniClientes: string[] = [];
  articuloSelec: Articulo = {id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0};
  cantidadSelec: number = 0;
  precioTotal: number = 0;

  constructor(private service: PedidoService, private productoService: ProductoService, private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.getArticulos();
    this.getClientes();
    console.log(this.dniClientes);
  }

  crearNuevoPedido() {
    this.nuevoPedido.dniCliente = this.dniCliente;
    this.nuevoPedido.productos = this.productosSelec;
    this.nuevoPedido.precioTotal = parseFloat(this.precioTotal.toFixed(2));

    this.service.crearPedido(this.nuevoPedido).subscribe(response => {

      console.log('Pedido creado:', response);
      //this.service.setMostrarMensaje(true);
      this.router.navigate(['/pedido/'+response.id]);
    });


    console.log(this.nuevoPedido);
  }

  volverPedidos(){
    this.router.navigate(['/home']);
  }

  getArticulos() : void {
    this.productoService.getArticulos()
      .subscribe( articulos => this.articulos = articulos);
  }

  agregarArticuloAProductos() : void {
    this.productosSelec.push({
      nroArticulo : this.articuloSelec.id,
      nombre : this.articuloSelec.nombre,
      precio: this.articuloSelec.precio,
      cantidad: this.cantidadSelec});

    this.articuloSelec.nombre = '';
    this.precioTotal += (this.articuloSelec.precio * this.cantidadSelec);
    this.cantidadSelec = 0;
    console.log(this.productosSelec);
  }

  onChangeSelec() : void {
    console.log(this.articuloSelec.nombre);
  }

  borrarArticulo(nroArticulo: number) {
    this.productosSelec = this.productosSelec.filter(producto => producto.nroArticulo !== nroArticulo);
   //const productosEncontrados: Producto = this.productosSelec.filter(producto => producto.nroArticulo === nroArticulo).at(0);
  //restar precio del producto seleccionado al precio total
    this.precioTotal -= 0;
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe( clientes => {
        this.dniClientes = clientes.map(cliente => cliente.dni);
      });
  }

  filtrarSugerencias() {
    this.sugerenciasFiltradas = this.dniClientes.filter(sugerencia =>
      sugerencia.toLowerCase().includes(this.dniCliente)
    );
  }

  seleccionarSugerencia(sugerencia: string) {
    this.dniCliente = sugerencia;
    this.sugerenciasFiltradas = [];
  }
}
