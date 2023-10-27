import {Producto} from "./producto";

export interface Pedido {
  id: number;
  fecha: Date;
  fechaStr: string;
  dniCliente: string;
  estado: number;
  precioTotal: number;
  estadoTexto: string;
  productos: Producto[];
}
