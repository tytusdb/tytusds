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
class listasimp {
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

  addUltimo(data: any){
    const newNode = new Node(data, null);
    if ( !this.head ) {
        this.head = newNode
        nodes.add(
          {id: i, label:data}
        );
        console.log(edges)
    }
    else {
      console.log(edges)
        let actual = this.head
        while (actual.next) {
            actual = actual.next;
        }
        actual.next = newNode;
        var id = nodes.get({
          fields:['id', 'label']
        });
        let men: number;
        for (var val of id){
          if(val.label == actual.data){
            men = val.id;
          }
        }
        nodes.add(
          {id: l, label:data}
        );
        edges.add(
          {from: men, to: l, length: 20, arrows: 'to'}
        );
        console.log(edges);
        i++;
        l++;

    }
    this.size++
    }

  removeData(data: any){
    let actual = this.head;
    let anterior = null;
    while(actual != null){
        if (actual.data === data) {
            if(!anterior){
                this.head = actual.next;
            }
            else {
                anterior.next = actual.next;
            }
            this.size--;
            console.log('Este es el fin del hombre arana??')
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
            return actual.data
        }
        anterior = actual;
        actual = actual.next;
    }/*
    var id = nodes.get({
      fields:['id', 'label']
    });
    let men: number;
    for (var val of id){
      if(val.label == parseInt(actual.data)){
        men = val.id;
      }
    }*/
    return null
}
}

@Component({
  selector: 'app-listasimple',
  templateUrl: './listasimple.component.html',
  styleUrls: ['./listasimple.component.css']
})
export class ListasimpleComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }
  contenido = "{ \"valores\": [\n";

  
  generador(){
    for(var j =0;j<this.array.length;j++){
      if(this.array[j]!=null){
        if(j+1!=this.array.length){
          this.contenido += this.array[j]+",\n";
        }else{
          this.contenido += this.array[j]+"\n";
        }
      }
    }
    this.contenido += "]}";
  }

  descargarContenido(){
    this.generador();
    let downloadfile = "data: text/json;charset=utf-8,"+encodeURIComponent(this.contenido);
    console.log(downloadfile);
    var downloader = document.createElement('a');
    downloader.setAttribute('href', downloadfile);
    downloader.setAttribute('download', 'data.json');
    downloader.click();
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }
  code = '';
  array = [];
  texto="";
  lista = new listasimp();
  abrir(eve:any)
  {
    let a =eve.target.files[0]
    let text=""
    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        var data = JSON.parse(text);
        data.valores.forEach(element => {
          this.array.push(element)
        });
        
        this.array.forEach(el => this.lista.addPrimero(el.toString())) // para ingresar los datos
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


  }
  AgregarNuevo(valor: any){
    this.lista.addPrimero(valor);
    this.array.unshift(valor);
    console.log(this.lista);
  }
  AgregarNuevoUltimo(valor: any){
    this.lista.addUltimo(valor);
    this.array.push(valor);
    console.log(this.lista);
   }
  Eliminar(valor: any){
    console.log('valor ' + valor)
    this.lista.removeData(valor)
    this.blankspace(valor);
    console.log("this.lista");
    console.log(this.lista);
  }
  blankspace(value){
    for(var j=0;j<this.array.length;j++){
      if(this.array[j]==value){
        this.array[j]=null;
        return;
      }
    }

  }

  /*
  Buscar(valor: any){
    var id = nodes.get({
      fields:['id']
    })
    var label = nodes.get({
      fields:['label']
    })
    console.log("id we");
    console.log(id);
    console.log("label we");
    console.log(label);
    for (var val of id){
      console.log("Valor de id prro")
      console.log(val)
    }
  }
  DatosRecorrido(){
    let id = nodes.get({
      fields:['id', 'label']
    });
    console.log("Cantidad de Datos we")
    console.log(id.length)
    for (var val of id){
      console.log("Valor de id prro")
      console.log(val.label)
      console.log(val.id)
    }
  }
*/
}
