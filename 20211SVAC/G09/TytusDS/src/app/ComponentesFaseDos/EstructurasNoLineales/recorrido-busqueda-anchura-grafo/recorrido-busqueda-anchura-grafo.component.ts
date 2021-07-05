import { Component, OnInit } from '@angular/core';
declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let anchuraGrafos= require('../../../EstructurasF2/AnchuraGrafos')
@Component({
  selector: 'app-recorrido-busqueda-anchura-grafo',
  templateUrl: './recorrido-busqueda-anchura-grafo.component.html',
  styleUrls: ['./recorrido-busqueda-anchura-grafo.component.css']
})
export class RecorridoBusquedaAnchuraGrafoComponent implements OnInit {
  aG= new anchuraGrafos()

  constructor() {
   }

  ngOnInit(): void {
  }

  value(){
    
  }
  leerArchivo(event: any){
    let ca= new CargaArchivo()
    ca.leerGrafo(event,2)
    setTimeout(() => {//debugger
      let grafo=ca.returnGrafo()
      for (let i = 0; i < grafo.vertices.length; i++) {
        this.aG.AgregarNodo(grafo.vertices[i])
      }
      for (let i = 0; i < grafo.aristas.length; i++) {
        this.aG.AgregarVertice(grafo.aristas[i].vertice,grafo.aristas[i].arista)
      }
      this.aG.MostrarGrafo()      
    }, 600);
  }
  download(){
    let dow= new guardarArchivo()
    //dow.guardarMatriz(this.rcM.returnValores(),"RowMajor")
  }  
}
