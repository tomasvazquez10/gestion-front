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

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ListaClienteComponent,
    MenuComponent,
    AgregarClienteComponent,
    ProveedorComponent,
    ListaProveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
