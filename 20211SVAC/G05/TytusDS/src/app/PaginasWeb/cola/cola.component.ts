import { Component, OnInit } from '@angular/core';
declare var require: any;
let Lista=require('./js/Cola');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-cola',
  templateUrl: './cola.component.html',
  styleUrls: ['./cola.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class ColaComponent implements OnInit {
  lista=Lista;

  constructor() {
  this.lista=new Lista();
  }

  ngOnInit(): void {
  }
  Add(valor){
    this.lista.insertar(valor);
    
  
    //this.graficar();
  }
  delete(){
    this.lista.eliminar();
    
    //this.graficar();
  }
  //OPCIONES PARA GRAFICAR------------------------
  //

}
