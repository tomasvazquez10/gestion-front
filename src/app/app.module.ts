import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './views/cliente/cliente.component';
import { HttpClientModule } from "@angular/common/http";
import { ListaClienteComponent } from './lists/lista-cliente/lista-cliente.component';
import {ClienteService} from "./service/cliente.service";
import { MenuComponent } from './utils/menu/menu.component';
import { AgregarClienteComponent } from './creates/agregar-cliente/agregar-cliente.component';
import { ProveedorComponent } from './views/proveedor/proveedor.component';
import { ListaProveedorComponent } from './lists/lista-proveedor/lista-proveedor.component';
import {ProveedorService} from "./service/proveedor.service";
import { CuentaComponent } from './views/cuenta/cuenta.component';
import { AlertComponent } from './utils/alert/alert.component';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgregarProveedorComponent } from './creates/agregar-proveedor/agregar-proveedor.component';
import { ConfirmPopupComponent } from './utils/confirm-popup/confirm-popup.component';
import { HomeComponent } from './utils/home/home.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
import { AgregarPedidoComponent } from './creates/agregar-pedido/agregar-pedido.component';
import { ListaPedidosComponent } from './lists/lista-pedidos/lista-pedidos.component';
import { PedidoComponent } from './views/pedido/pedido.component';
import { ListaArticulosComponent } from './lists/lista-articulos/lista-articulos.component';
import { AgregarArticuloComponent } from './creates/agregar-articulo/agregar-articulo.component';
import { ArticuloComponent } from './views/articulo/articulo.component';
import { ListaPrecioArticuloComponent } from './lists/lista-precio-articulo/lista-precio-articulo.component';
import { ListaRepartosComponent } from './lists/lista-repartos/lista-repartos.component';
import { ListaComprasComponent } from './lists/lista-compras/lista-compras.component';
import { ListaVentasComponent } from './lists/lista-ventas/lista-ventas.component';
import { VentaComponent } from './views/venta/venta.component';
import { AgregarPagoComponent } from './creates/agregar-pago/agregar-pago.component';
import { AgregarRepartoComponent } from './creates/agregar-reparto/agregar-reparto.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ListaClienteComponent,
    MenuComponent,
    AgregarClienteComponent,
    ProveedorComponent,
    ListaProveedorComponent,
    CuentaComponent,
    AlertComponent,
    AgregarProveedorComponent,
    ConfirmPopupComponent,
    HomeComponent,
    EditarProveedorComponent,
    AgregarPedidoComponent,
    ListaPedidosComponent,
    PedidoComponent,
    ListaArticulosComponent,
    AgregarArticuloComponent,
    ArticuloComponent,
    ListaPrecioArticuloComponent,
    ListaRepartosComponent,
    ListaComprasComponent,
    ListaVentasComponent,
    VentaComponent,
    AgregarPagoComponent,
    AgregarRepartoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule
  ],
  providers: [ClienteService, ProveedorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
