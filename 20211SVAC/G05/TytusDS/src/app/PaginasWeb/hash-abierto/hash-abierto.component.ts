import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { TablaHashAbierta } from './ts/tabla-hash-abierta';
import { saveAs } from 'file-saver';
declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-hash-abierto',
  templateUrl: './hash-abierto.component.html',
  styleUrls: ['./hash-abierto.component.css']
})
export class HashAbiertoComponent implements OnInit {

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

  hash: TablaHashAbierta;


  constructor(private documentoService: DocumentoService) {
    this.hash = new TablaHashAbierta();
  }

  ngOnInit(): void {}

  getOpciones(opciones: any): void {
    this.opciones = opciones;
    console.log(opciones);
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      if (contenido['size'] !== undefined) {
        this.opciones['sizeNoLineales'] = contenido['size'];
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
      this.hash.llenarArreglo(this.opciones['sizeNoLineales'], this.opciones['rangoHashMinimo'], this.opciones['rangoHashMaximo']);
      this.primero = false;
    }

    this.hash.agregar(this.valorAgregar, this.valorAgregar, this.valorAgregar, this.opciones['funcionHash'], this.opciones['constante']);
    console.log(this.hash.arreglo);
    
    this.valorAgregar = '';

    console.log(this.hash.getNodos());
    if (!esperar) {
      this.graficar();
    }
  }

  eliminar(): void {
    if (this.valorEliminar.length === 0) return;

    this.hash.eliminar(this.valorEliminar, this.opciones['funcionHash'], this.opciones['constante']);

    this.valorEliminar = '';
    this.graficar();
  }

  actualizar(): void {
    if (this.valorAntiguo.length === 0 || this.valorActualizar.length === 0) return;

    this.hash.actualizar(this.valorAntiguo, this.valorActualizar, this.opciones['funcionHash'], this.opciones['constante']);

    this.valorAntiguo = '';
    this.valorActualizar = '';
    this.graficar();
  }

  buscar(): void {
    if (this.valorBuscar.length === 0) return;
  }

  graficar(): void {
    //Retorno de la lista con los objetos de nodos y edges
    const nodes = this.hash.getNodos();
    const edges = this.hash.getEdges();
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
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white",
          background: "#ED9106"
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
    let grafo= new vis.Network(contenedor,datos,opciones);
  }

  guardar(): void {
    let arreglo: any = [];
    this.hash.arreglo.forEach( nodo => {
      if (nodo !== null) {
        nodo.lista.forEach( valor => {
          arreglo.push(valor.valor);
        });
      }
    });
    const contenido: any = {
      categoria: "Estructura No Lineal",
      nombre: "Tabla Hash Abierta",
      valores: arreglo
    };
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'TablaHashAbierta.json');
  }

}
