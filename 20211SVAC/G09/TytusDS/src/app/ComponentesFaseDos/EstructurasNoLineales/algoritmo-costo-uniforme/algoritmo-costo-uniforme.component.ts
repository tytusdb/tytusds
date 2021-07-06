import { Component, OnInit } from '@angular/core';
declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
//let anchuraGrafos= require('../../../EstructurasF2/AnchuraGrafos')
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
  //aG= new anchuraGrafos()

  costo(ini:string, fin:string){
    //this.cU.cambiarDatoNodo(this.aG.returnValores())
    console.log(this.cU.recorrerCostoUniforme(ini,fin))
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
        this.cU.AgregarNodo(grafo.vertices[i])
      }//debugger
      for (let i = 0; i < grafo.aristas.length; i++) {
        this.cU.AgregarVertice(grafo.aristas[i].vertice,grafo.aristas[i].arista,grafo.aristas[i].distancia)
      }
      this.cU.MostrarGrafo()
      this.cU.graficarGrafo()
    }, 600);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarGrafo(this.cU.returnValores(),"Grafo Dirigido/No Dirigido")
  }
  insert(text:string){
    this.cU.AgregarNodo(text)
    this.cU.MostrarGrafo()
  }
  insertVertice(from:string, to:string, distancia:string){
    this.cU.AgregarVertice(from,to, parseInt(distancia))
    this.cU.MostrarGrafo()
  }
  delete(text:string){
    this.cU.EliminarNodo(text)
    this.cU.MostrarGrafo()
  }
  search(text:string){
    console.log(this.cU.VerificarExisteNodo(text))
  }
  actualizar(textReplace:string, textNew:string){
    this.cU.ActualizarNodo(textReplace,textNew)
    this.cU.MostrarGrafo()
  }
}
