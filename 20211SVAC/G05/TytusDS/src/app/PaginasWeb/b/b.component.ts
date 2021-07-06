import { Component, OnInit } from '@angular/core';

import { DocumentoService } from '../../services/documento.service';
import { saveAs } from 'file-saver';
declare var require: any;
let Lista=require('./js/arbol_b');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class BComponent implements OnInit {
  lista=Lista;
  ag = '';
  ag1 = '';
  ag2 = '';
  ag3 = '';
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService)  {
  this.lista=new Lista();
  
  }

  ngOnInit(): void {
  }

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }


  graficar(){
    let contenedor= document.getElementById("myDiv1");
    let datos=this.lista.as();
    let Nodos=datos[0];
    let Edges=datos[1];
    let data={nodes:Nodos,edges:Edges};

    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
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
      }, physics:{
        enabled: true,
        barnesHut: {
          gravitationalConstant: -1000,
          centralGravity: 0.3,
          springLength: 95
        }},
      layout:{
        hierarchical: {
          direction: "RL",
          sortMethod: "directed",
          nodeSpacing: 200,
          treeSpacing: 400
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,data,opciones);
  }




  getDocumento(documento: any): void{
    if(this.opciones['repeticionLineales']===true){
      this.documentoService.getDocumento(documento).then( contenido => {
        console.log(contenido);
        contenido['valores'].forEach(valor => { 
          this.lista.insertarNodo(valor,this.opciones['grado']);
  
          }); });
    }
    else{
      this.documentoService.getDocumento(documento).then( contenido => {
        console.log(contenido);
        contenido['valores'].forEach(valor => { 
          this.lista.insertarNodo(valor,this.opciones['grado']);
      
          }); });
    }
    
  }




  Add(valor){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      this.lista.insertarNodo(valor,this.opciones['grado']);
      this.graficar();
      this.ag = '';
      return;
    }
    else{
      //this.lista.repeat=false;
      this.lista.insertarNodo(valor,this.opciones['grado']);
      this.graficar();
      this.ag = '';
      return;
      console.log("gg");
    }
    
    
  
    //this.graficar();
  }
  delete(){
    this.lista.eliminar();
    
    //this.graficar();
  }
  //OPCIONES PARA GRAFICAR------------------------
  //

  bus(valor){
     this.lista.buscar(valor);
    this.ag3 = '';
      return;

  }

  modi(valor,valor1){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      this.lista.modificar(valor,valor1);
      this.lista.pintar();
      this.ag1 = '';
      this.ag2 = '';
      return;
      
    }
    else{
      //this.lista.repeat=false;
      this.lista.modificar2(valor,valor1);
      this.lista.pintar();
      this.ag1 = '';
      this.ag2 = '';
      return;
    }

  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Cola De Prioridad",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lista.leer());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'arbolb.json');
  }



  actualizar(){
    this.lista.pintar();
  }
}
