import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/login.service";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.component.html',
  styleUrls: ['./registro-datos.component.css']
})
export class RegistroDatosComponent implements OnInit{
  constructor(private authService: AuthService) { }
  datosDeMongo: any;
  ngOnInit() {
    this.authService.obtenerDatosDeMongo().subscribe(data => {
      this.datosDeMongo = data;
    });
    initFlowbite();

  }
  
}
