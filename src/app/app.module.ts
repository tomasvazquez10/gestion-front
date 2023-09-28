import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule } from "@angular/common/http";
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import {ClienteService} from "./service/cliente.service";
import { MenuComponent } from './menu/menu.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import {ProveedorService} from "./service/proveedor.service";
import { CuentaComponent } from './cuenta/cuenta.component';
import { AlertComponent } from './alert/alert.component';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { HomeComponent } from './home/home.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
import { AgregarPedidoComponent } from './agregar-pedido/agregar-pedido.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ListaArticulosComponent } from './lista-articulos/lista-articulos.component';
import { AgregarArticuloComponent } from './agregar-articulo/agregar-articulo.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ListaPrecioArticuloComponent } from './lista-precio-articulo/lista-precio-articulo.component';
import { ListaRepartosComponent } from './lista-repartos/lista-repartos.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';

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
    ListaComprasComponent
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
