import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
import {Chart} from 'chart.js/dist/chart.js';
declare var require: any;
let Orden= require('./js/OBurbuja');

@Component({
  selector: 'app-ord-burbuja',
  templateUrl: './ord-burbuja.component.html',
  styleUrls: ['./ord-burbuja.component.css']
})
export class OrdBurbujaComponent implements OnInit {
  lista=Array();
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
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
    this.graficar();
  }
  graficar(){
    let EAnim=(<HTMLCanvasElement>document.getElementById('Oanimacion'))?.getContext('2d');
    let opciones1={
      type: 'bar',
      data: {
        labels:["1","dos","3"],
        datasets:[{
          label:"Prueba",
          data:[1,2,3],
          backgroundColor:["red","yellow","blue"],
          borderWith:2,
        }]
      },
      options: {
        scales: {
          yAxes:[{
            ticks:{
              beginAtZero:true
            }

          }]
        }
      }
    }
    var grafo= new Chart(EAnim,opciones1);

  }



}





