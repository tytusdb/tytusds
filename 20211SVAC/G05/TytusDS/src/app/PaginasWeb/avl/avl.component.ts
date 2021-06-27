import { Component, OnInit } from '@angular/core';
import { ArbolAvl } from './ts/arbol-avl';
import { DocumentoService } from '../../services/documento.service';
import { saveAs } from 'file-saver';


declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-avl',
  templateUrl: './avl.component.html',
  styleUrls: ['./avl.component.css']
})
export class AvlComponent implements OnInit {

  arbol: ArbolAvl;

  //  Las variables para manejar las operaciones de la lista
  valorAgregar = '';
  valorEliminar = '';
  nodoActualizar = '';
  valorActualizar = '';
  valorBuscar = '';

  //  Opciones de configuracion de los arboles
  opciones = {
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) {
    this.arbol = new ArbolAvl();
  }

  ngOnInit(): void {
  }

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

  agregar(): void {
    if (isNaN(parseInt(this.valorAgregar, 10))){
      this.arbol.raiz = this.arbol.insertar(this.arbol.raiz, this.valorAgregar);
    }else {
      this.arbol.raiz = this.arbol.insertar(this.arbol.raiz, +this.valorAgregar);
    }
    this.graficar();
    this.valorAgregar = '';
  }
  
  eliminar(): void {
    if (isNaN(parseInt(this.valorEliminar, 10))){
      this.arbol.raiz = this.arbol.eliminar(this.arbol.raiz, this.valorEliminar);
    }else {
      this.arbol.raiz = this.arbol.eliminar(this.arbol.raiz, +this.valorEliminar);
    }
    console.log(this.arbol.getNodos());
    this.graficar();
    this.valorEliminar = '';
  }
  
  actualizar(): void {
    if (isNaN(parseInt(this.nodoActualizar, 10)) && isNaN(parseInt(this.valorActualizar, 10))){
      this.arbol.actualizar(this.arbol.raiz, this.nodoActualizar, this.valorActualizar);
    }else {
      this.arbol.actualizar(this.arbol.raiz, +this.nodoActualizar, +this.valorActualizar);
    }
    this.graficar();
    this.valorActualizar = '';
    this.nodoActualizar = '';
    
  }

  buscar(): void {

  }

  //OPCIONES PARA GRAFICAR------------------------
  graficar(): void {
    //Retorno de la lista con los objetos de nodos y edges
    const nodes = this.arbol.getNodos();
    const edges = this.arbol.getEdges();
    console.log(this.arbol.raiz);
    //se escoge el div a utilizar como contenedor
    let contenedor = document.getElementById("contenedor");
    const datos = {nodes:nodes,edges:edges};
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
    let grafo= new vis.Network(contenedor,datos,opciones);
  }

  cargar(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      contenido['valores'].forEach(valor => {
        this.arbol.raiz = this.arbol.insertar(this.arbol.raiz, valor);
      });
      this.graficar();
    });
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Arborea",
      nombre: "AVL",
      valores: []
    };
    const nodos = this.arbol.getNodos();
    for (let x = 0; x < nodos.length; x++) {
      contenido.valores.push(nodos[x].label);
    }
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
