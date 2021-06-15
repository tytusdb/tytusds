import { Component, OnInit } from '@angular/core';
declare var require: any;
let Lista=require('./js/ListaCircular');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-listas-circulares',
  templateUrl: './listas-circulares.component.html',
  styleUrls: ['./listas-circulares.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class ListasCircularesComponent implements OnInit {
  lista=Lista;

  constructor() {
  this.lista=new Lista();
  }

  ngOnInit(): void {
  }
  Add(valor){
    this.lista.appendF(valor);
    this.graficar();
  }
  delete(valor){
    this.lista.eliminar(valor);
    this.graficar();
  }
  //OPCIONES PARA GRAFICAR------------------------
  graficar():void{
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos=this.lista.Lnodos();
    let Edges=this.lista.Ledges();
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
        arrows:{
          to:{
            enabled:true
          }
        },
        color:{
          color:"red"
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);
  }

}
