import { Component, OnInit } from '@angular/core';
declare var require: any;
let Lista=require('./js/ListaCircular');
//,'../../../../css/bootstrap.min.css'
@Component({
  selector: 'app-listas-circulares',
  templateUrl: './listas-circulares.component.html',
  styleUrls: ['./listas-circulares.component.css']
})
export class ListasCircularesComponent implements OnInit {
  lista=Lista;
  constructor() {
  this.lista=new Lista();
  }

  ngOnInit(): void {
  }
  Add(valor){
    this.lista.appendI(valor);
    this.lista.imprimir();
  }

}
