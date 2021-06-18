import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
import {Chart} from 'chart.js/dist/chart.js';
declare var require: any;
let Orden= require('./js/OQuickSort');

@Component({
  selector: 'app-ord-quicksort',
  templateUrl: './ord-quicksort.component.html',
  styleUrls: ['ord-quicksort.component.css']
})
export class OrdQuicksortComponent implements OnInit {
  grafo;
  EAnim;
  lista=Array();
  lOrdenada=Array();
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 500,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) { }

  ngOnInit(): void {
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  //LEER ARCHIVOS DE ENTRADA--------------------------------
  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then(contenido => {

      contenido['valores'].forEach(valor => {
        this.lista.push(valor);
      });

    });

}}
