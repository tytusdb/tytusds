import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Cow} from './js/cow';
import { saveAs } from 'file-saver';
declare var require: any;
let Lista=require('./js/cow');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-cow',
  templateUrl: './cow.component.html',
  styleUrls: ['./cow.component.css']
})
export class CowComponent implements OnInit {
  opciones = {
    sizeNoLineales: 10,
    funcionHash: "simple",
    rangoHashMinimo: 45,
    rangoHashMaximo: 85,
    pruebaHashCerrado: "lineal",
    velocidadNoLineales: 2000,
    constante: 0.1625277911
  };
  lista=Lista;
  m = '';
  n = '';
  nx = '';
  ny = '';
  nvalor = '';
  valorAgregar = '';
  valorAgregar1 = '';
  valorAgregar2 = '';
  valorEliminar = '';
  valorAntiguo = '';
  valorActualizar = '';
  valorBuscar = '';

  primero = true;



  constructor(private documentoService: DocumentoService) {
    this.lista=new Lista();
  }

  ngOnInit(): void {}

  getOpciones(opciones: any): void {
    this.opciones = opciones;
    console.log(opciones);
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
     
      
   
    });
  }

  agregar(v1,v2,v3){
   this.lista.agregar(v1,v2,v3)
  }

  agregar1(v1,v2){
    this.lista.matriz(v1,v2)
   }

  eliminar() {
    this.lista.tabla();
    this.lista.imprimir2();
    
  }

  actualizar(){
   
  }

  buscar(){
  
  }

  graficar(){
   
  }

  guardar() {
   
  }

}
