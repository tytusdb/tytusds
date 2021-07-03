import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var options = {
  
  physics: {
    enabled: true,
  },
};
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
let listaData = { nodes: nodes,
  edges: edges };


  // class arista {
  //   from: vertice;
  //   peso: number;
  //   to: vertice;
  //   constructor(from,peso,to) {
  //     this.from = from;
  //     this.peso = peso;
  //     this.to = to;
  //   }
  // }

  class vertice {
    id: number;
    valor: any;
    adyacencia: vertice[];
    aristas: number[];

    constructor(value, id) {
      this.valor=value;
      this.id = id;
    }

    addArista(peso,vertice){
      this.aristas.push(peso);
      this.adyacencia.push(vertice);
    }
  }

  class grafo {
    vertix: vertice[];
    constructor() {
      this.vertix = [];
    }
  }
  var pagina = new grafo();


@Component({
  selector: 'app-rbanchura-grafos',
  templateUrl: './rbanchura-grafos.component.html',
  styleUrls: ['./rbanchura-grafos.component.css']
})





export class RBAnchuraGrafosComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network:any;

  

  constructor() { }

  
  

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }

  ValorPos(valor: any){
    let dato = 0
    if(typeof valor == 'string'){
        for(let j = 0; j < valor.length; j++){
            dato += valor.charCodeAt(j)
        }
    } else {
        dato = valor
  return dato
    }
    return dato
}

  addVertice(data){
    nodes.add(
      {id: this.ValorPos(data), label: data}
    );
    pagina.vertix.push(new vertice(data,this.ValorPos(data)));
  }

  addArista(veri,dist,verf){
    edges.update(
      {from: this.ValorPos(veri), to: this.ValorPos(verf) , length:20, label:dist}
    );

    var tmp = this.buscarPagina(veri);
    tmp.aristas.push(dist);
    tmp.adyacencia.push(verf);
  }

  deleteVertice(data){
    nodes.remove(this.ValorPos(data));
    pagina.vertix.splice(this.getindexPagina(data),1)
  }
  actualizarVertice(viejo, nuevo){
    var tmp = this.buscarPagina(viejo);
    nodes.update({
      id: tmp.id, label: nuevo
    });
    tmp.valor = nuevo;
  }
  buscarVertice(data){
    var tmp = this.buscarPagina(data);
    nodes.update(
      {id: tmp.id, color: "red"}
    );
  }

  searchAnchura(data){

  }
  searchProfundidad(data){

  }
  
  descargar(){}

  buscarPagina(data){
    for(var i = 0;i<pagina.vertix.length;i++){
      if(pagina.vertix[i].valor==data){
        return pagina.vertix[i];
      }
    }
  }
  getindexPagina(data){
    for(var i = 0;i<pagina.vertix.length;i++){
      if(pagina.vertix[i].valor==data){
        return i;
      }
    }
  }
  
  abrir(eve:any)
  {
    


  }
}
