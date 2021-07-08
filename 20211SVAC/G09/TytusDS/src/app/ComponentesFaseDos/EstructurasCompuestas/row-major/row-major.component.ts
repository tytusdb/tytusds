import { Component, OnInit } from '@angular/core';

declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let rowColMayor= require('../../../EstructurasF2/rowColMayor')
let Animaciones= require('../../../EstructurasF2/Animaciones')
//let vis=require('../../../../../node_modules/vis/dist/vis')
@Component({
  selector: 'app-row-major',
  templateUrl: './row-major.component.html',
  styleUrls: ['./row-major.component.css']
})
export class RowMajorComponent implements OnInit {
  rcM= new rowColMayor()
  animate= new Animaciones()
  constructor() { }

  ngOnInit(): void {
  }
  leerArchivo(event: any){
    let ca= new CargaArchivo()
    ca.leerMatriz(event,2,"row")
    setTimeout(() => {
      this.rcM.convertRowmayor(ca.returnMatriz())
      this.animate.graficarMatrizUnaDimension(this.rcM.returnMatriz())
    }, 1000);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarMatriz(this.rcM.returnValores(),"RowMajor")
  }
  insert(text:string){
    this.rcM.insertar(text)
    console.log("______________________")
    this.rcM.imprimir()
  }
  delete(text:string){
    this.rcM.delete(text)
    console.log("______________________")
    this.rcM.imprimir()
  }
  search(text:string){
    console.log(this.rcM.search(text).existe)
  }
  actualizar(textReplace:string, textNew:string){
    this.rcM.actualizar(textReplace,textNew)
    console.log("______________________")
    this.rcM.imprimir()
  }
  graficar(){
    let nodes = [];

    // Create a data table with links.
    let edges = [];

    nodes.push({id: 1, label: 'Get HTML', shape: 'image'});
    nodes.push({id: 2, label: 'Using SVG', shape: 'image'});
    edges.push({from: 1, to: 2, length: 300});

    // create a network
    var container = document.getElementById("DivInsert")

    //var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    //network = new vis.Network(container, data, options);
    //let garf = new vis.Network(container, data, {});        
}  
}
