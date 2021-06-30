import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var tama: number, valor: number//tamaño de arreglo para la tabla

class Node {
  data: any
  next: Node
  prev: Node
  constructor (data: any, next: Node, prev: Node){
      this.data = data;
      this.next = next;
      this.prev = prev;
  }
}

class ListaDoble {
  head: Node
  tail: Node
  size: number
  constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  addhead(data: any){
      const newNode = new Node(data, this.head, null);
      if (this.head){
          newNode.next = this.head;
          this.head.prev = newNode;
          this.head = newNode;
      }
      else {
          this.head = newNode;
          this.tail = newNode;
      }
      this.size++;
  }
  actualizarValor(dato: any, valor: any) {
    let aux = this.head;
    if (aux == null) {
        console.log("Nada we")
    } else {
        while (aux != null) {
            if (aux.data == dato) {
                aux.data = valor;
                return true
            } else {
                aux = aux.next;
            }
        }
    }
  }

  buscar(dato: any) {
    let aux = this.head;
    if (aux == null) {
        console.log("LISTA VACIA")
    } else {
        while (aux != null) {
            if (aux.data == dato) {
                aux = aux.next;
                return true
            } else {
                aux = aux.next;
            }
        }
        console.log("NO SE ENCONTRO")
        return false
    }
  }
  addtail(data: any){
      const newNode = new Node(data, null, this.tail);
      if (this.tail){
          newNode.prev = this.tail;
          this.tail.next = newNode;
          this.tail = newNode;
      }
      else {
          this.tail = newNode;
          this.head = newNode;
      }
      this.size++;
  }

  deletehead(){
      if (!this.head){
          return null;
      }
      const valoret = this.head.data;

      if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
      }
      else {
          this.head = this.head.next;
          this.head.prev = null;
      }
      this.size--;
      return valoret;
  }

  deletetail(){
      if (!this.tail){
          return null;
      }
      const valoret = this.tail.data;

      if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
      }
      else {
          this.tail = this.tail.prev;
          this.tail.next = null;
      }
      this.size--;
      return valoret;
  }

  delete(data: any){
      let actual = this.head;
      let anterior = null;

      while (actual != null){
          if (actual.data === data){
              if (!anterior){
                  return this.deletehead();
              }else if(!actual.next){
                  return this.deletetail();
              }
              else {
                  anterior.next = actual.next;
                  actual.next.prev = anterior;
              }
              this.size--;
              return actual.data;
          }
          anterior = actual;
          actual = actual.next;
      }
      return null
  }

  print(){
      let actual = this.head;
      let result = '';
      while (actual){
          result += actual.data + '<-->';
          actual = actual.next;
      }
      return result += 'X';
  }

}

class HashAbierta{
  Arreglo: any[];
  fun:any;
 
  constructor(fun:any){
    this.Arreglo = null;
    this.fun = fun;
  }
  simple(){
    let k = 0.5567;
    return k * tama;
  }

  division(k:any){
      return k % tama;
  }

  multiplicacion(k:any){
      const A = 0.6180;
      return tama*((k*A) % 1);
  }

  // lineal(k){
  //     return ((k+1) % tama);
  // }

  // cuadratica(k,i){
  //     return ((k+i) % tama);
  // }

  // doble(k,i){
  //     return (((k % tama) + i * (7-(k % 7))) % tama);
  // }
  NuevaTabla(tamano: number){
    tama = tamano;
    this.Arreglo = new Array(tama);//arreglo del tamaño especifico
    for (let j = 0; j < tama; j++) {
      this.Arreglo[j] = "-1";
      /*nodes.update(
        {id: j, label:'0',x: this.x1 , y: this.y1, color: "#7BE141", shape: "box"}
      );
      this.x1 = this.x1 + 50
      */
    }
  }

  ValorPos(valor: any){
		let dato = 0
		if(typeof valor === 'string'){
			for(let j = 0; j < valor.length; j++){
				dato += valor.charCodeAt(j)
			}
		} else {
			dato = valor
      return dato
		}
		return dato
	}
  
  eliminar(valor:any){
    let posicion = this.ValorPos(valor);
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        if(this.Arreglo[res]!="-1"){
          this.Arreglo[res].delete(valor)
        }else{
          console.log("Posición vacía")
        }
        
      }else if(this.fun == "Div"){
        let res = this.division(posicion);
        if(this.Arreglo[res]!="-1"){
          this.Arreglo[res].delete(valor);
        }else {
          console.log("Posición vacía")
        }

      }else if(this.fun == "Multi"){
        let res =Math.trunc(this.multiplicacion(posicion));
        if(this.Arreglo[res]!="-1"){
          this.Arreglo[res].delete(valor);
        }else {
          console.log("Posición vacía")
        }
      }
    

    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }

  actualizar(key:any, nuevo:any){
    let posicion = this.ValorPos(key);
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        if(this.Arreglo[res]!="-1"){
          this.Arreglo[res].actualizarValor(key,nuevo);
        }else{
          console.log("Posición vacía")
        }
        
      }else if(this.fun == "Div"){
        let res = this.division(posicion);
        if(this.Arreglo[res]!="-1"){
          this.Arreglo[res].actualizarValor(key,nuevo);
        }else {
          console.log("Posición vacía")
        }

      }else if(this.fun == "Multi"){
        let res =Math.trunc(this.multiplicacion(posicion));
        if(this.Arreglo[res]!="-1"){
          this.Arreglo[res].actualizarValor(key,nuevo);
        }else {
          console.log("Posición vacía")
        }
      }
    

    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }

  buscar(dato:any){
    let posicion = this.ValorPos(dato);
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        if(this.Arreglo[res]!="-1"){
          let bandera = this.Arreglo[res].buscar(dato);
        }else{
          console.log("Posición vacía")
        }
        
      }else if(this.fun == "Div"){
        let res = this.division(posicion);
        if(this.Arreglo[res]!="-1"){
          let bandera = this.Arreglo[res].buscar(dato);
        }else {
          console.log("Posición vacía")
        }

      }else if(this.fun == "Multi"){
        let res =Math.trunc(this.multiplicacion(posicion));
        if(this.Arreglo[res]!="-1"){
         let bandera =  this.Arreglo[res].buscar(dato);
        }else {
          console.log("Posición vacía")
        }
      }
    

    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }

  AgregarValores(dato: any){
    let posicion = this.ValorPos(dato);
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        if(this.Arreglo[res]!="-1"){
          // si hay un dato en esa posición y se recorre la lista
          this.Arreglo[res].addhead(dato);
        }else{
          //no hay dato en esa posición, se agrega
          this.Arreglo[res] = new ListaDoble;
          this.Arreglo[res].addhead(dato);
        }
        

      }else if(this.fun == "Div"){
        let res = this.division(posicion);
        if(this.Arreglo[res]!="-1"){
          // si hay un dato en esa posición y se recorre la lista
          this.Arreglo[res].addhead(dato);
        }else {
          //no hay dato en esa posición, se agrega
          this.Arreglo[res] = new ListaDoble;
          this.Arreglo[res].addhead(dato);
        }

      }else if(this.fun == "Multi"){
        let res =Math.trunc(this.multiplicacion(posicion));
        if(this.Arreglo[res]!="-1"){
          // si hay un dato en esa posición y se recorre la lista
          this.Arreglo[res].addhead(dato);
        }else {
          //no hay dato en esa posición, se agrega
          this.Arreglo[res] = new ListaDoble;
          this.Arreglo[res].addhead(dato);
        }
      }
    

    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }
}

@Component({
  selector: 'app-hash-abierta',
  templateUrl: './hash-abierta.component.html',
  styleUrls: ['./hash-abierta.component.css']
})
export class HashAbiertaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
