export interface Pago {
  id: number;
  fecha: Date;
  formaPago: string;
  monto: number;
  descuento: number;
  pedidoId: number;
}
