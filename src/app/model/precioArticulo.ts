import {Articulo} from "./articulo";

export interface PrecioArticulo {
  idArticulo: number;
  articulo: Articulo;
  precio: number;
  fecha: Date;
}
