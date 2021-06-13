import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstructurasService } from '../../services/estructuras.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configuraciones = {};

  constructor(private estructurasService: EstructurasService, private router: Router) {
    this.configuraciones = this.estructurasService.getConfig();
    if (this.configuraciones['repeticionLineal'] === 'false') {
      this.configuraciones['repeticionLineal'] = false;
    }else {
      this.configuraciones['repeticionLineal'] = true;
    }
    if (this.configuraciones['repeticionArbol'] === 'false') {
      this.configuraciones['repeticionArbol'] = false;
    }else {
      this.configuraciones['repeticionArbol'] = true;
    }

    console.log(this.configuraciones);
  }

  ngOnInit(): void {}

  guardar(): void {
    this.estructurasService.setIngreso(this.configuraciones['ingreso']);
    this.estructurasService.setRepeticionLineal(this.configuraciones['repeticionLineal']);
    this.estructurasService.setAnimacionLineal(this.configuraciones['animacionLineal']);
    this.estructurasService.setAnimacionOrdenamiento(this.configuraciones['animacionOrdenamiento']);
    this.estructurasService.setAnimacionArbol(this.configuraciones['animacionArbol']);
    this.estructurasService.setGrado(this.configuraciones['grado']);
    this.estructurasService.setRepeticionArbol(this.configuraciones['repeticionArbol']);
    this.router.navigateByUrl('/menu');
  }

}
