import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
import {Chart} from 'chart.js/dist/chart.js';
declare var require: any;
let Orden= require('./js/Insercion');

@Component({
  selector: 'app-inserccion',
  templateUrl: './inserccion.component.html',
  styleUrls: ['./inserccion.component.css']
})
export class InserccionComponent implements OnInit {
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
    try{
    this.documentoService.getDocumento(documento).then(contenido => {

      contenido['valores'].forEach(valor => {
        this.lista.push(valor);
      });
      this.graficar();
    });
    }catch (e){
      alert("Escoger un archivo")
    }
  }
  graficar(){
    let EAnim=(<HTMLCanvasElement>document.getElementById('Oanimacion'))?.getContext('2d');
    let ordenB= new Orden(this.lista);
    let recorridos=ordenB.inser();
    this.lOrdenada=recorridos[recorridos.length-1];
    let velocidad=(this.opciones['velocidadOrdenamientos']);
    let k=0;
    const animBurbuja=setInterval(()=>{
      //recorrido es cada uno de los recorridos que se hizo antes de llegar al ordenamiento.
      let recorrido=recorridos[k];
      //datos que seran enviados para graficar
      let data=Array();
      let labels=Array();
      let colores=Array();
      for(let i=0; i<recorrido.length;i++){
        //si el recorrido es un string
        if(typeof recorrido[i]== "string"){
          labels.push(recorrido[i]);
          data.push(recorrido[i].charCodeAt());
          colores.push("#b47cd8");
          //si el recorrido es un numero
        }else{
          labels.push(recorrido[i]);
          data.push(recorrido[i]);
          colores.push("#b47cd8");
        }
      }
      k+=1;
      this._graficar(labels,data,colores,EAnim);
      //cuando k llegue al numero de recorridos hechos
      if(k==recorridos.length-1){
        clearInterval(animBurbuja);
      }
    },velocidad);
  }

  _graficar(labels,data,colores,EAnim){
    let opciones1={
      type: 'bar',
      data: {
        //ARRAY
        labels:labels,//ARRAY
        datasets:[{
          label:"Ordenamiento Burbuja",
          //ARRAY
          data:data,
          //ARRAY DE STRING
          backgroundColor:colores,
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
    //resetear la variable grafo si existe
    if (this.grafo) {
      this.grafo.destroy();
    }
    //graficado
    this.grafo= new Chart(EAnim,opciones1);
  }
  //GUARDAR
  guardar(): void {
    const contenido: any = {
      categoria: "Ordenamientos",
      nombre: "Ordenamiento Inserccion",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lOrdenada);
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'inserccion.json');
  }

}





