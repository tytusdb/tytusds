import { Component, OnInit } from '@angular/core';
import { CodigoHamming } from './ts/hamming';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-hamming',
  templateUrl: './hamming.component.html',
  styleUrls: ['./hamming.component.css']
})
export class HammingComponent implements OnInit {

  //  Las opciones de la confuguracion para las operaciones
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  entrada = '';
  salida = '';
  paridades = [];
  bits = 0;

  ham: CodigoHamming;

  constructor(private documentoService: DocumentoService) {
    this.ham = new CodigoHamming();
  }

  ngOnInit(): void {}

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      if (contenido['data'] === undefined) {
        return;
      }
      this.entrada = contenido['data'];
    });
  }

  procesar(): void {
    if (this.entrada.length === 0) {
      return;
    }
    console.log(this.entrada);
    this.bits = this.ham.calcularBitsRedundantes(this.entrada.length);
    console.log(this.bits);
    let nuevaCadena = this.ham.rellenarPosiciones(this.entrada, this.bits);
    console.log(nuevaCadena);
    this.paridades = this.ham.calcularParidades(nuevaCadena, this.bits);
    console.log(this.paridades);
    this.salida = this.ham.calcularFinal(nuevaCadena, this.paridades);
    console.log(this.salida);
  }

  guardar(): void {

  }

}
