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

    //CONVERTIR LETRAS DEL TEXTO A CIFRAR EN BINARIO
    let L_letras=this.T_comprimir.split('');
    let Tbinario=L_letras.map(function(char) {
      const binary = char.charCodeAt(0).toString(2)
      const pad = Math.max(8 - binary.length, 0);
      //PARA ASEGURAR EXACTAMENTE 8 DIGITOS BINARIOS POR LETRA
      return '0'.repeat(pad) + binary;
    }).join('')
    //CONVERTIR LETRAS DE LA KEY CON LA QUE SE CIFRARA EN BINARIO
    let key=this.key.split('');
    let keyBinaria=key.map(function(char) {
      const binary = char.charCodeAt(0).toString(2)
      const pad = Math.max(8 - binary.length, 0);
      //PARA ASEGURAR EXACTAMENTE 8 DIGITOS BINARIOS POR LETRA
      return '0'.repeat(pad) + binary;
    }).join('')
    keyBinaria=this.EquilibrarKey(keyBinaria.slice(),(Math.round(Tbinario.length/2)));
    console.log(Math.round(L_letras.length/2));
    console.log(keyBinaria.length);
    this.feistel.IngDatos(Tbinario,keyBinaria,Niteracion);
    this.feistel.Cifrar();
    this.resultado=this.feistel.resultado;
    this.iteraciones=this.feistel.iteraciones;
    this.mitad=this.resultado.length/2;
  }
  EquilibrarKey(key,mitad){
    let k=key.split('');

    //INSERTAR EN ENL INICIO UNSHIFT
    if(k.length<mitad){
      while (k.length!=mitad){
        k.unshift('0');
      }
    }
    console.log(k.slice().toString().replaceAll(',',''));
    return k.slice().toString().replaceAll(',','');
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
  //GUARDAR
  guardar(): void {
    let cadena=[`Cadena a Cifrar: ${this.T_comprimir}`];
    let cadenaBin=[`Cadena en Binario: ${this.feistel.cadena}`];
    let key=[`Key: ${this.key}`];
    let iteraciones=[`No. Iteraciones: ${this.Niteraciones}`];
    let resultado=[`Cifrado: ${this.resultado}`]
    let valores=["categoria: Algoritmo de codificacion","nombre: Cifrado Feistel","repeticion:true","animacion:10"]
    valores=valores.concat(cadena);
    valores=valores.concat(cadenaBin);
    valores=valores.concat(key);
    valores=valores.concat(iteraciones);
    valores=valores.concat(resultado);
    let blob = new Blob([valores.toString()], {type: 'txt;charset=utf-8'});
    saveAs(blob, 'descarga.txt');
  }

}
