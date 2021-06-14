import { Component, OnInit } from '@angular/core';
import { GraficasService } from "../../services/graficas/graficas.service";
import {Router} from '@angular/router';
//import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-estructuras-lineales',
  templateUrl: './estructuras-lineales.component.html',
  styleUrls: ['./estructuras-lineales.component.css']
})
export class EstructurasLinealesComponent implements OnInit {

  constructor(private graficaService: GraficasService) { }

  ngOnInit(): void {
    alert('como te va!');
  }

  Ir() {
    //this.Router.navigate(["<ListaSimple>"]);    //alert('hola!'); 
  }

}
