import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
//declare var vis: any;

@Component({
  selector: 'app-costo-uniforme',
  templateUrl: './costo-uniforme.component.html',
  styleUrls: ['./costo-uniforme.component.css']
})
export class CostoUniformeComponent implements OnInit {

//  @ViewChild('mynetwork') cuerpoDraw: ElementRef

  constructor() { }

  ngOnInit(){
    console.log("leer nodos");
      var nodos = new DataSet([
        { id: 1, label: "A" },
        { id: 2, label: "B" },
        { id: 3, label: "C" },
        { id: 4, label: "D" },
        { id: 5, label: "E" },
        { id: 1, label: "F" }
      ]);
      console.log("leer aristas");
      var arista = new DataSet([
        { from: 1, to: 3, label: "14" },
        { from: 2, to: 4, label: "15" },
        { from: 4, to: 3, label: "16" },
        { from: 1, to: 2, label: "17" },
        { from: 2, to: 4, label: "18" }
      ]);
      console.log("contenedor");
  
      var conteiner = document.getElementById('mynetwork');
  
      console.log("guardar datos");
      var datos = {
        nodes: nodos,
        edges: arista
      };

      console.log("direccion de aristas");
  
      var opciones = {
        edges: {
          arrows: {
            to:{
              enabled:true
            }
          }
        }
      };
  
      console.log("entrar todo a mi network");
      var grafo = new Network(conteiner, datos, opciones);
  
    }
  
  

}