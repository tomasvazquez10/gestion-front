import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from "./lista-cliente/lista-cliente.component";
import {AgregarClienteComponent} from "./agregar-cliente/agregar-cliente.component";
import {ListaProveedorComponent} from "./lista-proveedor/lista-proveedor.component";
import {CuentaComponent} from "./cuenta/cuenta.component";
import {AlertComponent} from "./alert/alert.component";
import {ClienteComponent} from "./cliente/cliente.component";
import {AgregarProveedorComponent} from "./agregar-proveedor/agregar-proveedor.component";

const routes: Routes = [

  { path: 'clientes', component: ListaClienteComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'agregar-cliente', component: AgregarClienteComponent},
  { path: 'agregar-proveedor', component: AgregarProveedorComponent},
  { path: 'proveedores', component: ListaProveedorComponent},
  { path: 'cuenta', component: CuentaComponent},
  { path: 'mensaje-ok', component: AlertComponent},
  { path: 'cliente/:id', component: ClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
