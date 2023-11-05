import {Proveedor} from "./proveedor";

export interface Articulo {
  id: number;
  nroArticulo: number,
  nombre: string;
  descripcion: string;
  cuitProveedor: string;
  stock: number;
  precio: number;
  ventasTotales: number;
}
