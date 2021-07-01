import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { AlgoritmoHuffman } from './ts/huffman';

@Component({
  selector: 'app-huffman',
  templateUrl: './huffman.component.html',
  styleUrls: ['./huffman.component.css']
})
export class HuffmanComponent implements OnInit {

  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  huff: AlgoritmoHuffman;

  entrada = '';
  caracteres: any = [];

  constructor(private documentoService: DocumentoService) {
    this.huff = new AlgoritmoHuffman();
  }

  ngOnInit(): void {}

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      if (contenido['texto'] === undefined) {
        return;
      }
      this.entrada = contenido['texto'];
    });
  }

  procesar(): void {
    if (this.entrada.length === 0) {
      return;
    }
    this.caracteres = this.huff.identificarCaracteres(this.entrada);
    console.log(this.caracteres);
  }

  guardar(): void {

  }

}
