import {Pago} from "./pago";

export interface Cuenta {
  id: number;
  idUsuario: string;
  saldo: number;
  pagos: Pago[];
  gastos: Pago[];
}
