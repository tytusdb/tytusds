import { Component, OnInit } from '@angular/core';
declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let ProfundidadGrafos= require('../../../EstructurasF2/ProfundidadGrafos')

@Component({
  selector: 'app-recorrido-busqueda-profundidad-grafo',
  templateUrl: './recorrido-busqueda-profundidad-grafo.component.html',
  styleUrls: ['./recorrido-busqueda-profundidad-grafo.component.css']
})
export class RecorridoBusquedaProfundidadGrafoComponent implements OnInit {
  pG= new ProfundidadGrafos()
  constructor() { }

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
        this.pG.AgregarNodo(grafo.vertices[i])
      }
      for (let i = 0; i < grafo.aristas.length; i++) {
        this.pG.AgregarVertice(grafo.aristas[i].vertice,grafo.aristas[i].arista)
      }
      this.pG.MostrarGrafo()      
    }, 600);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarGrafo(this.pG.returnValores(),"Grafo Dirigido/No Dirigido")
  }
  insert(text:string){
    this.pG.AgregarNodo(text)
    this.pG.MostrarGrafo()
  }
  insertVertice(from:string, to:string){
    this.pG.AgregarVertice(from,to)
    this.pG.MostrarGrafo()
  }
  delete(text:string){
    this.pG.EliminarNodo(text)
    this.pG.MostrarGrafo()
  }
  search(text:string){
    console.log(this.pG.VerificarExisteNodo(text))
  }
  actualizar(textReplace:string, textNew:string){
    this.pG.ActualizarNodo(textReplace,textNew)
    this.pG.MostrarGrafo()
  }  

}
