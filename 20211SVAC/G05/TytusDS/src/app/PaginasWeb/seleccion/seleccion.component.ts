import { Component, OnInit } from '@angular/core';
import { OrdenamientoSeleccion } from './ts/seleccion';
import { DocumentoService } from '../../services/documento.service';


declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  orden: OrdenamientoSeleccion;
  arreglo: any = [];
  tiempo = 3000;

  constructor(private documentoService: DocumentoService) {
    this.orden = new OrdenamientoSeleccion();
  }

  ngOnInit(): void {
  }

  getOpciones(opciones: any): void {
    this.tiempo = opciones['velocidadOrdenamientos'];
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      this.arreglo = this.orden.ordenar(contenido['valores'], contenido['cuenta']);
      console.log(this.arreglo);
    });
  }


  graficar(): void {

  }

}
