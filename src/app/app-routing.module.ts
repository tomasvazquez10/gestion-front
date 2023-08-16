import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from "./lista-cliente/lista-cliente.component";
import {AgregarClienteComponent} from "./agregar-cliente/agregar-cliente.component";
import {ProveedorComponent} from "./proveedor/proveedor.component";
import {ListaProveedorComponent} from "./lista-proveedor/lista-proveedor.component";

const routes: Routes = [
  { path: 'proveedores', component: ListaProveedorComponent },
  { path: 'clientes', component: ListaClienteComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path: 'agregar-cliente', component: AgregarClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
