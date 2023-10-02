import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from "./lists/lista-cliente/lista-cliente.component";
import {AgregarClienteComponent} from "./creates/agregar-cliente/agregar-cliente.component";
import {ListaProveedorComponent} from "./lists/lista-proveedor/lista-proveedor.component";
import {CuentaComponent} from "./views/cuenta/cuenta.component";
import {AlertComponent} from "./utils/alert/alert.component";
import {ClienteComponent} from "./views/cliente/cliente.component";
import {AgregarProveedorComponent} from "./creates/agregar-proveedor/agregar-proveedor.component";
import {HomeComponent} from "./utils/home/home.component";
import {ProveedorComponent} from "./views/proveedor/proveedor.component";
import {EditarProveedorComponent} from "./editar-proveedor/editar-proveedor.component";
import {AgregarPedidoComponent} from "./creates/agregar-pedido/agregar-pedido.component";
import {PedidoComponent} from "./views/pedido/pedido.component";
import {ListaArticulosComponent} from "./lists/lista-articulos/lista-articulos.component";
import {AgregarArticuloComponent} from "./creates/agregar-articulo/agregar-articulo.component";
import {ArticuloComponent} from "./views/articulo/articulo.component";
import {ListaRepartosComponent} from "./lists/lista-repartos/lista-repartos.component";
import {ListaComprasComponent} from "./lists/lista-compras/lista-compras.component";
import {ListaVentasComponent} from "./lists/lista-ventas/lista-ventas.component";
import {AgregarPagoComponent} from "./creates/agregar-pago/agregar-pago.component";
import {AgregarRepartoComponent} from "./creates/agregar-reparto/agregar-reparto.component";

const routes: Routes = [

  { path: 'clientes', component: ListaClienteComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'agregar-cliente', component: AgregarClienteComponent},
  { path: 'agregar-proveedor', component: AgregarProveedorComponent},
  { path: 'agregar-articulo', component: AgregarArticuloComponent},
  { path: 'agregar-reparto', component: AgregarRepartoComponent},
  { path: 'agregar-pago/:id', component: AgregarPagoComponent},
  { path: 'crear-pedido', component: AgregarPedidoComponent},
  { path: 'proveedores', component: ListaProveedorComponent},
  { path: 'articulos', component: ListaArticulosComponent},
  { path: 'repartos', component: ListaRepartosComponent},
  { path: 'compras', component: ListaComprasComponent},
  { path: 'ventas', component: ListaVentasComponent},
  { path: 'cuenta', component: CuentaComponent},
  { path: 'mensaje-ok', component: AlertComponent},
  { path: 'cliente/:id', component: ClienteComponent},
  { path: 'articulo/:id', component: ArticuloComponent},
  { path: 'proveedor/:id', component: ProveedorComponent},
  { path: 'pedido/:id', component: PedidoComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
