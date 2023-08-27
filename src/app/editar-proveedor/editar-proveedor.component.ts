import {Component, OnInit} from '@angular/core';
import {Proveedor} from "../model/proveedor";
import {Router} from "@angular/router";
import {ProveedorService} from "../service/proveedor.service";

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit{

  proveedor: Proveedor = {
    id: 6,
    cuit: "302154527",
    nombre: "PAPA SRL",
    nombreFantasia: "papitas",
    email: "asasa@mail.com",
    direccion: "asd sdsdf 234",
    telefono: "11658235"
  };

  displayedColumns: string[] = ['nombreColumn', 'datosColumn'];

  constructor(private service: ProveedorService, private router: Router) { }

  ngOnInit(): void {
  }

  guardarEdicion() {
    // Enviar datos del nuevo cliente a la API
    this.service.editarProveedor(this.proveedor).subscribe(response => {

      console.log('Proveedor creado:', response);
      //this.service.setMostrarMensaje(true);
      this.router.navigate(['/proveedor/'+response.id]);
    });
  }

}
