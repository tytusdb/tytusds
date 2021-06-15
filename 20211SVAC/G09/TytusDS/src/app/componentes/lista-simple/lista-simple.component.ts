import { Component, OnInit } from '@angular/core';
import { ServicioIntento1Service } from "../../Servicios/servicio-intento1.service";

declare var Nodo:any; 
declare var Lista:any;
declare var f1:any;
declare var add:any;
declare var print:any;
//const arbolB = require('../../Structures/')
@Component({
  selector: 'app-lista-simple',
  templateUrl: './lista-simple.component.html',
  styleUrls: ['./lista-simple.component.css']
})
export class ListaSimpleComponent implements OnInit {

  elementos: any=[]

  constructor(private servicio: ServicioIntento1Service ) { }

  ngOnInit(): void {
    //this.add();
  }
  /*add(){
    this.servicio.getElementos().subscribe(
      res => {this.elementos = res;},
      err => console.error(err);
    )
  }*/

}
