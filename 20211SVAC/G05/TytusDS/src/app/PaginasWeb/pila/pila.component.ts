import { Component, OnInit } from '@angular/core';
declare var require: any;
let Lista=require('./js/Pila');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class PilaComponent implements OnInit {
  lista=Lista;

  constructor() {
  this.lista=new Lista();
  }

  ngOnInit(): void {
  }
  Add(valor){
    this.lista.guardar(valor);
    //this.graficar();
  }
  delete(valor){
    this.lista.desapila(valor);
    //this.graficar();
  }
  //OPCIONES PARA GRAFICAR------------------------
  //

}
