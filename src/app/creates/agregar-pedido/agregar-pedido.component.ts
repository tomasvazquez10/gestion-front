import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {PedidoService} from "../../service/pedido.service";
import {Producto} from "../../model/producto";
import {ProductoService} from "../../service/producto.service";
import {Articulo} from "../../model/articulo";
import {ClienteService} from "../../service/cliente.service";
import {VentaService} from "../../service/venta.service";
import {Venta} from "../../model/venta";
import {Location} from "@angular/common";

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent {

  nuevoPedido: Pedido = {id: 0, fecha: new Date(), dniCliente: '', estado: 0, precioTotal: 0, estadoTexto: '', productos: []};
  productosSelec: Producto[] = [];
  articulos: Articulo[] = [];
  dniCliente: string = '';
  sugerenciasFiltradas: string[] = [];
  dniClientes: string[] = [];
  articuloSelec: Articulo = {id: 0, nroArticulo: 0, nombre: '', descripcion: '', cuitProveedor: '', stock: 0, precio: 0};
  cantidadSelec: number = 0;
  precioTotal: number = 0;
  venta: Venta = { id: 0, pedido: this.nuevoPedido, pagos: []};

  constructor(private service: PedidoService, private productoService: ProductoService, private clienteService: ClienteService
              , private ventaService: VentaService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getArticulos();
    this.getClientes();

    this.dniCliente = this.service.getDniCliente();
    console.log(this.dniCliente);
  }

  crearNuevoPedido() {
    if(this.datosCorrectos()){
      this.clienteService.existeDNI(this.dniCliente).then((existe) => {
        if (existe) {
          this.nuevoPedido.dniCliente = this.dniCliente;
          this.nuevoPedido.productos = this.productosSelec;
          this.nuevoPedido.precioTotal = parseFloat(this.precioTotal.toFixed(2));

          this.service.crearPedido(this.nuevoPedido).subscribe(response => {
            console.log('Pedido creado:', response);
            console.log(response.body);
              //creo venta vinculada al pedido
              this.nuevoPedido.id = response.id;
              this.venta.pedido = response;
              console.log(this.venta);
              this.ventaService.crearVenta(this.venta).subscribe(response2 => {
                this.router.navigate(['/pedido/'+response.id]);
              });
          });
              } else {
                alert('El DNI ingresado no existe');
              }
            }).catch((error) => {
              console.error('Error al verificar DNI:', error);
            });
    }
  }

  datosCorrectos() : boolean {
    console.log();
    if (this.dniCliente === ''){
      alert('Debe ingresar un DNI Cliente');
      return false;
    }else if (!this.validarDNI((this.dniCliente).toString().length)){
      alert('Debe ingresar un formato correcto de DNI');
      return false;
    }else if (this.productosSelec.length === 0){
      alert('Debe ingresar al menos un Producto');
      return false;
    }else {
      return true;
    }
  }

  validarDNI(dni: number): boolean {
    return dni >= 7 && dni <= 8;
  }

  volverPedidos(){
    this.router.navigate(['/home']);
  }

  getArticulos() : void {
    this.productoService.getArticulos()
      .subscribe( articulos => this.articulos = articulos);
  }

  agregarArticuloAProductos() : void {
    if((this.articuloSelec.nombre !== '') && (this.articuloSelec.nombre !== 'Seleccionar...') && (this.cantidadSelec > 0)){
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

  }

  onChangeSelec() : void {
    console.log(this.articuloSelec.nombre);
  }

  borrarArticulo(nroArticulo: number) {
    const primerProducto: Producto | undefined = this.productosSelec.filter(producto => producto.nroArticulo === nroArticulo).at(0);
    console.log(primerProducto);
    if (primerProducto !== undefined) {
      const cantidad = primerProducto.cantidad;
      const precio = primerProducto.precio;
      this.precioTotal -= cantidad * precio;
    }
    this.productosSelec = this.productosSelec.filter(producto => producto.nroArticulo !== nroArticulo);

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

  volverAtras() {
    this.location.back();
  }
}
