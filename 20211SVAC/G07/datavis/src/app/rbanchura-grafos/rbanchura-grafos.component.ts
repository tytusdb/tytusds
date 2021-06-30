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


  class vertice {
    valor: number;
    adyacencia: number[];
    aristas: number[];

    constructor(value) {
      this.valor=value;
    }

    addArista(peso,vertice){
      this.aristas.push(peso);
      this.adyacencia.push(vertice);
    }
  }


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
  }

  addArista(veri,dist,verf){
    edges.update(
      {from: this.ValorPos(veri), to: this.ValorPos(verf) , length:20, label:dist}
    );
  }
  
  descargar(){}


  
  abrir(eve:any)
  {
    


  }
}
