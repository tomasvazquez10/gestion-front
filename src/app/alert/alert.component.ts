import {Component, Input, OnInit} from '@angular/core';
import {ClienteService} from "../service/cliente.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{

  @Input() message: string = '';
  colorMensaje : string = 'green';
  cambiarColor : boolean = false;
  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.colorMensaje = this.clienteService.getColorMensaje();
    this.cambiarColor = (this.colorMensaje=='red');
  }



}
