import { Component, OnInit } from '@angular/core';
import { ListaSimple } from './ts/lista-simple';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';

declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-lista-simple',
  templateUrl: './lista-simple.component.html',
  styleUrls: ['./lista-simple.component.css']
})
export class ListaSimpleComponent implements OnInit {

  lista: ListaSimple;  //  Variable para manejar la lista simple

  //  Las variables para manejar las operaciones de la lista 
  valorAgregar = '';
  valorEliminar = '';
  nodoActualizar = '';
  valorActualizar = '';
  valorBuscar = '';

  //  Las opciones de la confuguracion para las operaciones
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  documento: any;  //  Si el usuario ingresa un usuario para hacer su estructura

  constructor(private documentoService: DocumentoService) {
    this.lista = new ListaSimple();
  }

  ngOnInit(): void {}

  //  Si el usuario cambia alguna opcion se recibe la nueva configuracion y se cambia por la anterior
  getOpciones(opciones: any): void {
    console.log(opciones);
    this.opciones = opciones;
  }

  //  Si el usuario decide cargar un archivo
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      contenido['valores'].forEach(valor => {
        this.lista.insertarFinal(valor);
      });
      this.graficar();
    });
  }

  //  Agregar un nuevo elemento en la lista
  agregar(): void {
    if (this.valorAgregar.length > 0) {
      if (this.opciones['repeticionLineales'] === false) {
        if (this.lista.verRepetido(this.valorAgregar) === true) {
          this.valorAgregar = '';
          return;
        }
      }
      if (this.opciones['ingreso'] === 'final') {
        this.lista.insertarFinal(this.valorAgregar);
      } else if (this.opciones['ingreso'] === 'inicio') {
        this.lista.insertarInicio(this.valorAgregar);
      }
      console.log(this.lista.primero.valor);
      this.graficar();
      this.valorAgregar = '';
    }
  }

  //  Eliminar un elemento de la lista
  eliminar(): void {
    if (this.valorEliminar.toString().length > 0){
      this.lista.eliminar(+this.valorEliminar);
      this.graficar();
      this.valorEliminar = '';
    }
  }

  //  Actualizar un elemento de la lista
  actualizar(): void {
    if (this.nodoActualizar.length === 0 || this.valorActualizar.length === 0) {
      console.log('no se puede');
      return;
    }
    this.lista.actualizar(+this.nodoActualizar, this.valorActualizar);
    this.graficar();
    this.nodoActualizar = '';
    this.valorActualizar = '';
  }

  buscar(): void {}

  //OPCIONES PARA GRAFICAR------------------------
  graficar(): void {
    //Retorno de la lista con los objetos de nodos y edges
    const nodes = this.lista.getNodos();
    const edges = this.lista.getEdges();
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
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Lista Simplemente Enlazada",
      valores: []
    };
    let aux = this.lista.primero;
    for (let i = 0; i < this.lista.cuenta; i++) {
      contenido.valores.push(aux.valor);
      aux = aux.siguiente;
    }
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
