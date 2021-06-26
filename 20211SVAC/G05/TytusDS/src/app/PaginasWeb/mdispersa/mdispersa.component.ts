import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Matriz=require('./js/MatrizDispersa');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-mdispersa',
  templateUrl: './mdispersa.component.html',
  styleUrls: ['./mdispersa.component.css']
})
export class MDispersaComponent implements OnInit {
  matriz=Matriz;
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) {
    this.matriz=new Matriz();
  }

  ngOnInit(): void {
  }
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  Add(valor,x,y){
    //que no hayan casillas vacias:
    if(valor!="" && x!="" && y!=""){
      //que x y y sean numero, isNan devuelve falso si al intentar convertir un string a numero no retorne un NaN
      //por lo tanto dicho string si se puede a un numero y no es una palabra insertada
      if(isNaN(x)==false && isNaN(y)==false){
        //superadas las restricciones se debe de verificar si el valor ingresado en valor es un string o un numero
        if(isNaN(valor)==false){
          valor=parseInt(valor)
        }
        x=parseInt(x);
        y=parseInt(y);
        this.matriz.append(valor,x,y)
      }
    }
    this.graficar();
  }
  guardar(){

  }
  graficar(){
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos=this.matriz.Lnodos();
    let Edges=this.matriz.Ledges();
    console.log("Nodos");
    console.log(Nodos);
    console.log("edges");
    console.log(Edges)
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
    let opciones={
      edges:{
        arrows:{
          to:{
            enabled:true
          }
        },
        color:{
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white"
        },
        font:{
          color:"white"
        }
      },
      physics:{
        enabled: true}
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);

  }

}
