import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { GraficasService } from "../../services/graficas/graficas.service";
import {Router} from '@angular/router';
//import { HttpClient } from "@angular/common/http";
=======
//import { GraficasService } from "../../services/graficas/graficas.service";
import { HttpClient } from "@angular/common/http";
>>>>>>> 48810f1d1a62e2c19fdbf5f3107a7c0308de8bab
@Component({
  selector: 'app-estructuras-lineales',
  templateUrl: './estructuras-lineales.component.html',
  styleUrls: ['./estructuras-lineales.component.css']
})
export class EstructurasLinealesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    alert('como te va!');
  }

  Ir() {
    //this.Router.navigate(["<ListaSimple>"]);    //alert('hola!'); 
  }

}
