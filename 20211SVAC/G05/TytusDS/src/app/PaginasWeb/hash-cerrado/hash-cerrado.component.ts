import { Component, OnInit } from '@angular/core';
import { TablaHashCerrada } from './ts/tabla-hash-cerrada';
import { DocumentoService } from '../../services/documento.service';
import { saveAs } from 'file-saver';
declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-hash-cerrado',
  templateUrl: './hash-cerrado.component.html',
  styleUrls: ['./hash-cerrado.component.css']
})
export class HashCerradoComponent implements OnInit {

  grafo: any;

  opciones = {
    sizeNoLineales: 10,
    funcionHash: "simple",
    rangoHashMinimo: 45,
    rangoHashMaximo: 85,
    pruebaHashCerrado: "lineal",
    velocidadNoLineales: 2000,
    constante: 0.1625277911
  };

  valorAgregar = '';
  valorEliminar = '';
  valorAntiguo = '';
  valorActualizar = '';
  valorBuscar = '';

  primero = true;

  hash: TablaHashCerrada;

  constructor(private documentoService: DocumentoService) {
    this.hash = new TablaHashCerrada();
  }

  ngOnInit(): void {}

  
  getOpciones(opciones: any): void {
    this.opciones = opciones;
    console.log(opciones);
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      if (contenido['m'] !== undefined) {
        this.opciones['sizeNoLineales'] = contenido['m'];
      }
      if (contenido['funcion'] !== undefined) {
        this.opciones['funcionHash'] = contenido['funcion'];
      }
      if (contenido['minimo'] !== undefined) {
        this.opciones['rangoHashMinimo'] = contenido['minimo'];
      }
      if (contenido['maximo'] !== undefined) {
        this.opciones['rangoHashMinimo'] = contenido['maximo'];
      }
      if (contenido['prueba'] !== undefined) {
        this.opciones['pruebaHashCerrado'] = contenido['prueba'];
      }
      if (contenido['animacion'] !== undefined) {
        this.opciones['velocidadNoLineales'] = contenido['animacion'] * 100;
      }
      
      contenido['valores'].forEach(valor => {
        this.valorAgregar = `${valor}`;
        this.agregar(true);
      });
      this.graficar();
    });
  }

  agregar(esperar?: boolean): void {
    if (this.valorAgregar.length === 0) return;

    if (this.primero) {
      this.hash.llenarArreglo(this.opciones['sizeNoLineales'], this.opciones['rangoHashMinimo'], this.opciones['rangoHashMaximo'], this.opciones['pruebaHashCerrado'], this.opciones['funcionHash'], this.opciones['constante']);
      this.primero = false;
    }

    this.hash.agregar(this.valorAgregar);
    this.valorAgregar = '';
    console.log(this.hash.arreglo);
    if (!esperar) {
      this.graficar();
    }
  }

  eliminar(): void {
    if (this.valorEliminar.length === 0) return;
  
    this.hash.eliminar(this.valorEliminar);
    this.valorEliminar = '';
    this.graficar();
  }

  actualizar(): void {
    if (this.valorAntiguo.length === 0 || this.valorActualizar.length === 0) return;

    this.hash.actualizar(this.valorAntiguo, this.valorActualizar);
    this.valorAntiguo = '';
    this.valorActualizar = '';
    this.graficar();
  }

  buscar(): void {
    if (this.valorBuscar.length === 0) return;
    let id = this.hash.buscar(this.valorBuscar);
    if (id == -1) {
      alert(`No se ha encontrado el valor ${this.valorBuscar}`);
      this.valorBuscar = '';
      return;
    }
    let options={
      scale: 10,
      offset: {x:10, y:10},
      locked: false,
      animation: {
        //duración en ms
        duration: this.opciones['velocidadNoLineales'],
        easingFunction: "easeInOutQuad"
      }
    }
    this.valorBuscar = '';
    this.grafo.focus(id,options);
  }

  graficar(busquda?: any): void {
    //Retorno de la lista con los objetos de nodos y edges
    let nodes = [];
    let edges = this.hash.getEdges();
    if (busquda) {
      nodes = busquda
    }else {  
      nodes = this.hash.getNodos();
    }
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
        }
      },
      nodes:{
        color:{
          border:"white"
        },
        font:{
          color:"white"
        }
      },
      physics:{
        enabled: false
      },
      layout:{
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
          nodeSpacing: 200,
          treeSpacing: 400
        }
      }
    };
    //------------------------------------------------------------------------
    this.grafo = new vis.Network(contenedor,datos,opciones);
  }

  guardar(): void {
    let arreglo: any = [];
    this.hash.arreglo.forEach( nodo => {
      if (nodo !== null) {
        arreglo.push(nodo.valor);
      }
    });
    const contenido: any = {
      categoria: "Estructura No Lineal",
      nombre: "Tabla Hash Cerrada",
      valores: arreglo
    };
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'TablaHashCerrada.json');
  }


}
