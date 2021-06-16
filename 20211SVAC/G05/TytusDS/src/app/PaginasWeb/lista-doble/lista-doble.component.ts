import { Component, OnInit } from '@angular/core';
import { ListaDoble } from './ts/lista-doble';
import { DocumentoService } from '../../services/documento.service';
import { saveAs } from 'file-saver';

declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-lista-doble',
  templateUrl: './lista-doble.component.html',
  styleUrls: ['./lista-doble.component.css']
})
export class ListaDobleComponent implements OnInit {

  lista: ListaDoble;

  valorAgregar = '';
  valorEliminar = '';
  nodoActualizar = '';
  valorActualizar = '';
  valorBuscar = '';

  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) { 
    this.lista = new ListaDoble();
  }

  getOpciones(opciones: any): void {
    console.log(opciones);
    this.opciones = opciones;
  }

  ngOnInit(): void {}

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      contenido['valores'].forEach(valor => {
        if (this.opciones.ingreso === 'final') {
          this.lista.agregarFinal(valor);
        } else if (this.opciones.ingreso === 'inicio') {
          this.lista.agregarInicio(valor);
        }
      });
      this.graficar();
    });
  }

  agregar(): void {
    if (this.valorAgregar.length > 0) {
      if (this.opciones['repeticionLineales'] === false) {
        if (this.lista.verRepetido(this.valorAgregar) === true) {
          this.valorAgregar = '';
          return;
        }
      }

      if (this.opciones['ingreso'] === 'final'){
        this.lista.agregarFinal(this.valorAgregar);
      }else if (this.opciones['ingreso'] === 'inicio') {
        this.lista.agregarInicio(this.valorAgregar);
      }
      this.lista.recorrer();
      this.graficar();
      this.valorAgregar = '';
    }
  }

  eliminar(): void {
    if (this.valorEliminar.toString().length > 0){
      this.lista.eliminar(+this.valorEliminar);
      console.log(this.lista);
      this.graficar();
      this.valorEliminar = '';
    }
  }

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

  buscar(): void {
    console.log('buscar');
  }

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
