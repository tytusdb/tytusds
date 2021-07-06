import { Component, OnInit } from '@angular/core';
declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let anchuraGrafos= require('../../../EstructurasF2/AnchuraGrafos')
let CostoUniforme= require('../../../EstructurasF2/CostoUniforme')
@Component({
  selector: 'app-algoritmo-costo-uniforme',
  templateUrl: './algoritmo-costo-uniforme.component.html',
  styleUrls: ['./algoritmo-costo-uniforme.component.css']
})
export class AlgoritmoCostoUniformeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cU = new CostoUniforme()
  aG= new anchuraGrafos()

  costo(ini:string, fin:string){
    console.log(this.cU.CostoUniforme(this.aG.returnValores(),ini,fin))
  }
  value(){
    this.cU.graficarGrafo()
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
