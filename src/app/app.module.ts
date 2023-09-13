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
import {MatTableModule} from "@angular/material/table";
import { AgregarPedidoComponent } from './agregar-pedido/agregar-pedido.component';

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
    AgregarPedidoComponent
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
