import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let lzw=require('./js/lzw');

@Component({
  selector: 'app-lzw',
  templateUrl: './lzw.component.html',
  styleUrls: ['./lzw.component.css']
})
export class LZWComponent implements OnInit {
  resultado="";
  T_comprimir="";
  cabecera=["w","K","wK","Agregar al diccionario","Salida"];
  eIteraciones=false;
  iteraciones=[];

  lzw=lzw;
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
    this.lzw= new lzw();
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  //COMPRIMIR
  comprimir(texto){
    if(texto!=""){
      this.lzw.text=texto;
      this.lzw.Gcodigo();
      texto=this.lzw.codigo;
      this.resultado=texto
      console.log(this.lzw.iteraciones);
      this.eIteraciones=true;
      this.iteraciones=this.lzw.iteraciones;
    }
  }
  //GUARDAR
  guardar(): void {
    let diccionario=[`Diccinario: ${this.lzw.diccionario}`]
    let codigo=[`codigo: ${this.lzw.codigo} `]
    let valores=["categoria: Algoritmo de codificacion","nombre: Algoritmo LZW","repeticion:true","animacion:10"]
    valores=valores.concat(diccionario);
    valores=valores.concat(codigo);
    let blob = new Blob([valores.toString()], {type: 'txt;charset=utf-8'});
    saveAs(blob, 'descarga.txt');
  }
  //LEER ARCHIVOS DE ENTRADA--------------------------------
  getDocumento(documento: any): void {
    try{
      this.documentoService.getDocumento2(documento).then(contenido => {
       this.T_comprimir=contenido;
      });
    }catch (e){
      alert("Escoger un archivo")
    }
  }


}
