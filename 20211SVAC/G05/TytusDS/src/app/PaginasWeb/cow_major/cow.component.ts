import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { Cow} from './js/cow';
import { saveAs } from 'file-saver';
declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-cow',
  templateUrl: './cow.component.html',
  styleUrls: ['./cow.component.css']
})
export class CowComponent implements OnInit {

  grafo: any;
  
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
  valorAgregar1 = '';
  valorAgregar2 = '';
  valorEliminar = '';
  valorAntiguo = '';
  valorActualizar = '';
  valorBuscar = '';

  primero = true;



  constructor(private documentoService: DocumentoService) {

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

  agregar(){
   
  }

  eliminar() {
    
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
