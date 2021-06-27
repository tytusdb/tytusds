import { Component, OnInit } from '@angular/core';
import { CodigoHamming } from './ts/hamming';
import { DocumentoService } from '../../services/documento.service';
import { saveAs } from 'file-saver';

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

  cargado = false;
  subtitulos: any = [];

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
    let arr = this.entrada.split("");
    let encontrado = false;
    arr.forEach( e => {
      if (e !== "1" && e !== "0") {
        encontrado = true;
      }
    });
    if (encontrado) return;
    this.cargado = false;
    console.log(this.entrada);
    this.bits = this.ham.calcularBitsRedundantes(this.entrada.length);
    console.log(this.bits);
    this.subtitulos = this.ham.getSubtitulos(this.entrada, this.bits);
    console.log(this.subtitulos);
    let nuevaCadena = this.ham.rellenarPosiciones(this.entrada, this.bits);
    console.log(nuevaCadena);
    this.paridades = this.ham.calcularParidades(nuevaCadena, this.bits);
    console.log(this.paridades);
    this.salida = this.ham.calcularFinal(nuevaCadena, this.paridades);
    console.log(this.salida);
    this.cargado = true;
  }

  elevarCuadrado(exponente: number): number {
    return Math.pow(2, exponente);
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Algoritmo de codificación",
      nombre: "Código de Hamming",
      entrada: this.entrada,
      salida: this.salida
    };
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'hamming.json');
  }

}
