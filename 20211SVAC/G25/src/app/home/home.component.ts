import { Component, OnInit } from '@angular/core';
import {Listsimpenl} from '../lineal/listsimpenl';

import {Listcirsimple} from '../lineal/listcirsimple';
import {Pila} from '../lineal/pila';
import {Cola} from '../lineal/cola';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
optionSelect:number=0;
filtrados:any=[];
algoSelect:number=0;
prueba:Listsimpenl = new Listsimpenl();
nodoTemp:any;
ingresar:number=0;
valorLista=0;

//circular
cirListSimp:Listcirsimple=new Listcirsimple();

//Pila
pila:Pila= new Pila();
chekeado=true;

//Cola
cola:Cola = new Cola();


  constructor() { this.mostAlg(); }
mostCola(){
this.nodoTemp=this.cola.imprimir();
}
agrCola(){
  if(this.valorLista>0){
  this.cola.encolar(this.valorLista);
  this.valorLista=null;
  }
  this.mostCola();
}
eliPila(){
  this.pila.Desapilar();
  this.mostPila();
}
eliCola(){
  this.cola.desencolar();
  this.mostCola();
}
reiniciarLista(){
  this.nodoTemp=null;
}
  agrPila(){
    if(this.valorLista>0){
  this.pila.apilar(this.valorLista,this.chekeado);
  this.valorLista=null;
  console.log(this.chekeado);
}
this.mostPila();
  }
  mostPila(){
    this.nodoTemp = this.pila.mostrar();
  }

eliCircular(){
  this.cirListSimp.del();
  this.obtenerCircular();
}
agrCircular(){
  if(this.valorLista>0){
this.cirListSimp.add(this.valorLista);
this.valorLista=null;
this.obtenerCircular();
  }
}

obtenerCircular(){
  this.nodoTemp = this.cirListSimp.print();
}
  agrListaDoble(){
    if(this.valorLista>0){
    this.prueba.add(this.valorLista);
    this.valorLista=null;
    this.nodoTemp = this.prueba.print();
  }
  }

agrLista(){
  if(this.valorLista>0){
  this.prueba.add(this.valorLista);
  this.valorLista=null;
  this.mostList();
}
}
mostList(){
  this.nodoTemp = this.prueba.print();
}
eliLista(){

}
/*mostList(){
this.nodoTemp = this.prueba.print();
}*/

mostAlg(){
this.algoSelect=0;
if(this.optionSelect==1){

  this.filtrados=[
  {"valor":1,"nombre":"Lista Simple Enlazada"},
  {"valor":2,"nombre":"Lista Doblemente enlazada"},
  {"valor":3,"nombre":"Lista circular simplemente enlazada"},
  {"valor":4,"nombre":"Lista circular doblemente enlazada"},
  {"valor":5,"nombre":"Pila"},
  {"valor":6,"nombre":"Cola"},
  {"valor":7,"nombre":"Cola de prioridad"}];
}else if(this.optionSelect==2){
  this.filtrados=[
  {"valor":4,"nombre":"Burbuja"},
  {"valor":1,"nombre":"Selecci??n"},
  {"valor":2,"nombre":"Inserci??n"},
  {"valor":3,"nombre":"R??pido"}];
}else if(this.optionSelect==3){
    this.filtrados=[
    {"valor":1,"nombre":"Arbol Binario de Busqueda"},
    {"valor":2,"nombre":"AVL"},
    {"valor":3,"nombre":"??rbol B"},
    {"valor":4,"nombre":"??rbol B+"},
    {"valor":5,"nombre":"??rbol de Merkle"}];
    }
}
}
