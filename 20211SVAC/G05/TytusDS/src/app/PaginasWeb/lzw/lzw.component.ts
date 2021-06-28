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

      let R=document.getElementById('Resultado');
      this.lzw.text=texto;
      this.lzw.Gcodigo();
      texto=this.lzw.codigo;
      console.log(texto);
      R!.innerHTML=texto;

    }
  }
  clear(){
    (<HTMLInputElement>document.getElementById('Resultado')).innerHTML='';
  }
  //LEER ARCHIVOS DE ENTRADA--------------------------------
  getDocumento(documento: any): void {
    try{
      this.documentoService.getDocumento(documento).then(contenido => {
        contenido['valores'].forEach(valor => {
        });
      });
    }catch (e){
      alert("Escoger un archivo")
    }
  }

}
