import { Component, OnInit } from '@angular/core';
declare var require: any;
let ldenlazada=require('../../Structures/listatwoenlazada')

@Component({
  selector: 'app-lista-doble-enlazada',
  templateUrl: './lista-doble-enlazada.component.html',
  styleUrls: ['./lista-doble-enlazada.component.css']
})
export class ListaDobleEnlazadaComponent implements OnInit {
  list=ldenlazada
  
  displayVal='';
  getValue(val:string){
    console.warn(val)
    var hola = this.list. ldobleAdd(val)  
    this.displayVal=hola
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  getDelete(val:string){}
  getSearch(val:string){}
  getRefresh(val:string){}
}
