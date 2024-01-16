import {Articulo} from "./articulo";
import {Proveedor} from "./proveedor";

export interface Compra {
  idCompra: number;
  articulo: Articulo;
  fecha: Date,
  cantidad: number;
  precioUnidad: number;
  pago: boolean;
  cuitProveedor: string;
}
