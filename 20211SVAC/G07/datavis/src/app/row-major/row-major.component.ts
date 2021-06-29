import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';

var n: number; // columnas
var m: number; // filas
var matriz: any[][];//matriz
var linealizado: any[];//matriz de 2d linealizada
var taman: number; //tamaño del arreglo
var fr: number, cr: number, ante: string
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };

@Component({
  selector: 'app-row-major',
  templateUrl: './row-major.component.html',
  styleUrls: ['./row-major.component.css']
})
export class RowMajorComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;

  constructor() { }
  x1 = 0;
  y1 = 0;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }
  code = '';
  texto="";
  abrir(eve:any)
  {

  }
  AgregarNuevo(valor: any, fila: number, columna: number){
    fr = fila
    cr = columna
    matriz[fr][cr] = valor
    nodes.update(
      {id: fr+','+cr, label:String(valor)/*, color: "#7BE141"*/}
    );
/*
    nodes.update(
      {id: fr+','+cr, label:String(valor), color: "rgba(97,195,238,0.5)"}
    )*/
  }
  TamanoMatriz(dato1: number, dato2: number){
    m = dato1 //filas
    n = dato2//columnas
    //se crea un arreglo del Tamaño de matriz m
    matriz = new Array(m);
    //en cada fila se crean las columnas, un arreglo de tamaño n
    for(var i=0; i<m; i++) {
      //Bucle que recorre el array que está en la posición i
      matriz[i] = new Array(n)
      for(var j=0; j<n; j++) {
          matriz[i][j] = 0; // se agregan 0 en todas las posiciones
          nodes.add(
            {id: i+','+j, label:'0',x: this.x1 , y: this.y1, color: "rgba(97,195,238,0.5)",shape: "box"}
          );
          this.x1 = this.x1 + 50
      }
      this.x1 = 0
      this.y1 = this.y1 + 35
  }
    console.log('LLENO');
    console.log(matriz);// muestra de la matriz
    var id = nodes.get({
      fields:['id', 'label']
    });
    console.log(id);
  }
  Linealizar(){
    taman = m*n;
    this.y1 = this.y1 + 50
    this.x1 = -40
    linealizado = new Array(taman);
    for (let j = 0; j < taman; j++) {
      linealizado[j] = '0';
      nodes.update(
        {id: j, label:'0',x: this.x1 , y: this.y1, color: "#7BE141", shape: "box"}
      );
      this.x1 = this.x1 + 50
    }
    console.log(linealizado);
    for (let i = 0; i < m; i++) {
		  for (let j = 0; j < n; j++) {
        console.log(i*n+j)
        console.log(matriz[i][j])
        let pos = i*n+j
        linealizado[pos] = matriz[i][j];
        nodes.update(
          {id: pos, label:String(matriz[i][j])}
        );
		  }
	  }
    console.log(linealizado);
  }
}
