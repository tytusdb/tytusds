import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
@Component({
  selector: 'app-feistel',
  templateUrl: './feistel.component.html',
  styleUrls: ['./feistel.component.css']
})
export class FeistelComponent implements OnInit {
  resultado="";
  T_comprimir="";
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
    try{
      this.documentoService.getDocumento2(documento).then(contenido => {
        this.T_comprimir=contenido;
      });
    }catch (e){
      alert("Escoger un archivo")
    }
  }
  guardar(){}
  cifrar(valor){

  }
}
