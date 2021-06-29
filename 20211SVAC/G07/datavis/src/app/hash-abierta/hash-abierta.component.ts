import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';

class Node {
  data: any;
  next: Node;
  prev: Node;
  constructor (data: any, next: Node, prev: Node){
      this.data = data;
      this.next = next;
      this.prev = prev;
  }
}
/*
class ListaDoble {
  head: Node;
  tail: Node;
  size: number;
  constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  addhead(data: any){
      const newNode = new Node(data, this.head, null);
      let anterior= null;
      if (this.head){
          newNode.next = this.head;
          this.head.prev = newNode;
          this.head = newNode;
          nodes.add(
            {id: l, label:data}
          );
          let men: number;
          var id = nodes.get({
            fields:['id', 'label']
          });
          anterior = this.head.next
          for (var val of id){
            if(val.label == anterior.data){
              men = val.id;
            }
          }
          edges.update(
            {from: l, to: men, length: 20, arrows: 'to'}
          );
          edges.update(
            {from: men, to: l, length: 20, arrows: 'to'}
          );
          i++;
          l++;
      }
      else {
          this.head = newNode;
          this.tail = newNode;
          nodes.add(
            {id: i, label:data}
          );
      }
      this.size++;
  }

  addtail(data: any){
      const newNode = new Node(data, null, this.tail);
      let anterior= null;
      if (this.tail){
          newNode.prev = this.tail;
          this.tail.next = newNode;
          this.tail = newNode;
          nodes.add(
            {id: l, label:data}
          );
          let men: number;
          var id = nodes.get({
            fields:['id', 'label']
          });
          anterior = this.tail.prev
          for (var val of id){
            if(val.label == anterior.data){
              men = val.id;
            }
          }
          edges.update(
            {from: l, to: men, length: 20, arrows: 'to'}
          );
          edges.update(
            {from: men, to: l, length: 20, arrows: 'to'}
          );
          i++;
          l++;
      }
      else {
          this.tail = newNode;
          this.head = newNode;
          nodes.add(
            {id: i, label:data}
          );
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
      console.log('delete head')
      console.log(valoret)
      var id = nodes.get({
        fields:['id', 'label']
      });
      let primer: number;
      for (var val of id){
        if(val.label == valoret){
          primer = val.id;
        }
      }
      console.log(primer);
      console.log(nodes)
      nodes.remove(primer);
      console.log(nodes)
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
      console.log('delete tail')
      console.log(valoret)
      var id = nodes.get({
        fields:['id', 'label']
      });
      let primer: number;
      for (var val of id){
        if(val.label == valoret){
          primer = val.id;
        }
      }
      console.log(primer);
      console.log(nodes)
      nodes.remove(primer);
      console.log(nodes)
      return valoret;
  }

  delete(data: any){
      let actual = this.head;
      let anterior = null;
      console.log("Nodos prrp")
      console.log(nodes);
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
                  if(actual.next){
                    var id = nodes.get({
                      fields:['id', 'label']
                    });
                    let primer: number;
                    for (var val of id){
                      if(val.label == actual.data){
                        primer = val.id;
                      }
                    }
                    nodes.remove(primer);

                    let froms: number;
                    for (var val of id){
                      if(val.label == anterior.data){
                        froms = val.id;
                      }
                    }
                    let to: number;
                    for (var val of id){
                      if(val.label == actual.next.data){
                        to = val.id;
                      }
                    }
                    edges.add(
                      {from: froms, to: to, length: 20, arrows: 'to'}
                    );edges.add(
                      {from: to, to: froms, length: 20, arrows: 'to'}
                    );
                  }
                  else{
                    var id = nodes.get({
                      fields:['id', 'label']
                    });
                    let primer: number;
                    for (var val of id){
                      if(val.label == actual.data){
                        primer = val.id;
                      }
                    }
                    nodes.remove(primer);
                  }
              }
              this.size--;
              console.log('Este es el fin del hombre arana??')

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
*/
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
