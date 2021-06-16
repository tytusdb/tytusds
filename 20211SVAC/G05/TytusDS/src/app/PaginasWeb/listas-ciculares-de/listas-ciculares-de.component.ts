import { Component, OnInit } from '@angular/core';
declare var require: any;
let Lista=require('./js/ListaCircularDE');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-listas-ciculares-de',
  templateUrl: './listas-ciculares-de.component.html',
  styleUrls: ['./listas-ciculares-de.component.css']
})
export class ListasCicularesDEComponent implements OnInit {
  lista=Lista;
  constructor() {
    this.lista= new Lista();
  }

  ngOnInit(): void {
  }
  Add(valor){
    this.lista.appendF(valor);
    this.graficar();
  }
  delete(valor){
    let eliminar=this.lista.eliminar(valor);
    if (eliminar!=null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }
  update(valor,new_valor){
    let act=this.lista.actualizar(valor,new_valor)
    if(act!=null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }
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
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        },
        font:{
          color:"white"
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);
  }
}
