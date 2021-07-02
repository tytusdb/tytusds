import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';

var n: number; // columnas
var m: number; // filas
var matriz: any[][];
//var rows: number[], columns: number[], values: any[];
var MaxRow: number, MaxCols: number;
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var fr: number, cr: number, ante: string
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };


@Component({
  selector: 'app-matrices-dispersas',
  templateUrl: './matrices-dispersas.component.html',
  styleUrls: ['./matrices-dispersas.component.css']
})
export class MatricesDispersasComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;

  constructor() { }
  x1 = 0;
  y1 = 0;
  rows = new Array()
  columns = new Array()
  values = new Array()
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
    let a =eve.target.files[0]
    let text=""

    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        var data = JSON.parse(text);  // se parse para obtener solo los datos
        data.valores.forEach(element => { // se pasa a un arreglo
          console.log(element.indices[0])
          console.log(element.indices[1])
          console.log(element.valor)
          let fila = Number(element.indices[0]);
          let columna = Number(element.indices[1]);
          this.AgregarNuevo(element.valor,fila,columna);
        });

        this.code=text.toString();
      }
      reader.readAsText(a)
    }

  }
  AgregarNuevo(valor: any, fila: number, columna: number){
    var ids = nodes.get({
      fields:['id', 'label', 'color']
    });
    for (var val of ids){
      console.log('quye pdo esta pasando prra')
      if(val.color === "#7BE141"){
        nodes.update(
          {id: val.id, color: "rgba(97,195,238,0.5)"}
        );
      }
    }
    console.log("id de los nodos we")
    console.log(ids)
    this.rows.push(fila)
    this.columns.push(columna)
    this.values.push(valor)
    MaxCols = Math.max.apply(null, this.columns)
    MaxRow = Math.max.apply(null, this.rows)
    if(ids.length === 0){
      let tempA = MaxCols + 1;
      let tempB = MaxRow + 1;
      this.TamanoMatriz(tempB, tempA)
      fr = fila
      cr = columna
      matriz[fr][cr] = valor
      nodes.update(
        {id: fr+','+cr, label:String(valor), color: "#7BE141"}
      );
    }
    else{
      var id = nodes.get({
        fields:['id', 'label']
      });
      console.log("id de los nodos we")
      console.log(id)
      for (var val of id){
        nodes.remove(val.id);
      }
      let tempA = MaxCols + 1;
      let tempB = MaxRow + 1;
      this.TamanoMatriz(tempB, tempA)
      for(var i=0; i<this.values.length; i++){
        fr = this.rows[i]
        cr = this.columns[i]
        matriz[fr][cr] = valor
        nodes.update(
          {id: fr+','+cr, label:String(this.values[i]), color: "#7BE141"}
        );
      }
    }

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
            {id: i+','+j, label:'0',x: this.x1 , y: this.y1, color: "rgba(97,195,238,0.5)", shape: "box"}
          );
          this.x1 = this.x1 + 40
      }
      this.x1 = 0
      this.y1 = this.y1 + 35
  }
    console.log('LLENO')
    console.log(matriz)// muestra de la matriz
    var id = nodes.get({
      fields:['id', 'label']
    });
    console.log(id)
  }
}
