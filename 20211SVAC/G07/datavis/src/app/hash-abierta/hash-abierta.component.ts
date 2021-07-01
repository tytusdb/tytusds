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
  constructor(){
    this.Arreglo = null;
  }

  NuevaTabla(tamano: number){
    tama = tamano;
    this.Arreglo = new Array(tama);//arreglo del tamaño especifico
    for (let j = 0; j < tama; j++) {
      this.Arreglo[j] = 0;
      /*nodes.update(
        {id: j, label:'0',x: this.x1 , y: this.y1, color: "#7BE141", shape: "box"}
      );
      this.x1 = this.x1 + 50
      */
    }
  }
  ValorPos(dato: any){
		//let valor = 0
		if(typeof dato === 'string'){
			for(let j = 0; j < dato.length; j++){
				valor += dato.charCodeAt(j)
			}
		} else {
			valor = dato
		}
		return valor
	}
  AgregarValores(dato: any){
    let datos = this.ValorPos(dato);
    try {
      if (datos < tama){
        if (this.Arreglo[datos] == 0){
          this.Arreglo[datos] = new ListaDoble;
          this.Arreglo[datos].addhead(datos);
        }else{
          this.Arreglo[datos].addhead(datos);
        }
      }
      else if (datos >= tama){
        while(datos >= tama){
          datos = datos - tama;
        }
        if (this.Arreglo[datos] == 0){
          this.Arreglo[datos] = new ListaDoble;
          this.Arreglo[datos].addhead(datos);
        }else{
          this.Arreglo[datos].addhead(datos);
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
