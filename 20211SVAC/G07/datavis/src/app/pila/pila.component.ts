import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  layout:{
    hierarchical:{
      enabled: true,
      direction: 'LR',
    },
  },
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };
var i = 0;
var l = 1;

class Node {
  data: any;
  next: Node;
  constructor(data: any, next: Node){
      this.data = data;
      this.next = next;
  }
}
class Pila {
  head: Node;
  size: number;
  constructor() {
      this.head = null;
      this.size = 0;
  }
  addPrimero(data: any){
      const newNode = new Node(data, null);
      if ( !this.head ) {
        this.head = newNode
        nodes.add(
          {id: i, label:data}
        );
        console.log(edges)
        }
      else {
        newNode.next = this.head
        let men: number;
        var id = nodes.get({
          fields:['id', 'label']
        });
        for (var val of id){
          if(val.label == this.head.data){
            men = val.id;
          }
        }
        this.head = newNode
        nodes.add(
          {id: l, label:data}
        );
        edges.update(
          {from: l, to: men, length: 20, arrows: 'to'}
        );
        i++;
        l++;
        console.log(edges);
        console.log(nodes)
      }
      this.size++
    }
    removeData(){
      if (this.size<0){
        return null;
      }else{
        let actual = this.head;
        this.head = actual.next;
        this.size--;
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
        return actual.data;
      }
    }
  }

@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css']
})
export class PilaComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }
  code = '';
  lista = new Pila();
  abrir(eve:any)
  {
    let a =eve.target.files[0]
    let text=""
    let arr = [];
    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        console.log(resultado)
        console.log(text)
        arr = text.replace("{","").replace("}","").split(",");
        arr.forEach(el => console.log(el))
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


  }
  AgregarNuevo(valor: any){
    this.lista.addPrimero(valor);
    console.log(this.lista);

  }
  Eliminar(){
    this.lista.removeData()
    console.log("this.lista");
    console.log(this.lista);
  }

}
