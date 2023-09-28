import {Articulo} from "./articulo";

export interface Compra {
  id: number;
  articulo: Articulo;
  fecha: Date,
  cantidad: number;
  precioUnidad: number;
}
