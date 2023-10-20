import {Pago} from "./pago";

export interface Cuenta {
  id: number;
  idUsuario: string;
  dniCliente: string;
  saldo: number;
  pagos: Pago[];
  gastos: Pago[];
}
