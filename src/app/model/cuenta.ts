import {Pago} from "./pago";
import {Compra} from "./compra";

export interface Cuenta {
  id: number;
  idUsuario: string;
  dniCliente: string;
  saldo: number;
  pagos: Pago[];
  gastos: Pago[];
  compras: Compra[];
}
