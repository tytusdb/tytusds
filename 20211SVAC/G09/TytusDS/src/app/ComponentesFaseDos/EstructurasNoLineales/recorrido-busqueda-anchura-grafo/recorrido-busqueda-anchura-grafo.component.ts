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
    this.aG.graficarGrafo()
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
      this.aG.graficarGrafo()
    }, 600);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarGrafo(this.aG.returnValores(),"Grafo Dirigido/No Dirigido")
  }
  insert(text:string){
    this.aG.AgregarNodo(text)
    this.aG.MostrarGrafo()
  }
  insertVertice(from:string, to:string){
    this.aG.AgregarVertice(from,to)
    this.aG.MostrarGrafo()
  }
  delete(text:string){
    this.aG.EliminarNodo(text)
    this.aG.MostrarGrafo()
  }
  search(text:string){
    console.log(this.aG.VerificarExisteNodo(text))
  }
  actualizar(textReplace:string, textNew:string){
    this.aG.ActualizarNodo(textReplace,textNew)
    this.aG.MostrarGrafo()
  }    
}
