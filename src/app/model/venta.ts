import {Pedido} from "./pedido";
import {Pago} from "./pago";

export interface Venta {
  id: number;
  pedido: Pedido;
  pagos: Pago[];
}
