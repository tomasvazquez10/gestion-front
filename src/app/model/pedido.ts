import {Producto} from "./producto";

export interface Pedido {
  id: number;
  fecha: Date;
  dniCliente: string;
  estado: number;
  precioTotal: number;
  estadoPedido: string;
  productos: Producto[];
}
