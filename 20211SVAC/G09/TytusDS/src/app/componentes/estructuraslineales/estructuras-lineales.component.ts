import { Component, OnInit } from '@angular/core';
import { GraficasService } from "../../services/graficas/graficas.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-estructuras-lineales',
  templateUrl: './estructuras-lineales.component.html',
  styleUrls: ['./estructuras-lineales.component.css']
})
export class EstructurasLinealesComponent implements OnInit {

  constructor(private graficaService: GraficasService) { }

  ngOnInit(): void {
  }

  Ir() {
    alert('hola!');
  }

}
