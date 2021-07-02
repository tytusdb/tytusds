import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Feistel=require('./js/feistel');
@Component({
  selector: 'app-feistel',
  templateUrl: './feistel.component.html',
  styleUrls: ['./feistel.component.css']
})
export class FeistelComponent implements OnInit {
  feistel=Feistel;
  resultado="";
  T_comprimir="";
  cabecera=["IZQUIERDA","DERECHA"];
  mitad=0;
  key='';
  iteraciones=[];
  Niteraciones=0;
  eIteraciones=false;
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
    this.feistel=new Feistel('','',0);
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  //CIFRAR
  cifrar(Niteracion){
    this.eIteraciones=true;
    this.feistel.IngDatos(this.T_comprimir,this.key,Niteracion);
    this.feistel.Cifrar();
    this.resultado=this.feistel.resultado;
    this.iteraciones=this.feistel.iteraciones;
    this.mitad=this.resultado.length/2;
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
  guardar(){}

}
