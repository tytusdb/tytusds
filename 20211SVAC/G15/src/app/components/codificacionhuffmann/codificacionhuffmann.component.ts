import { Component, OnInit } from '@angular/core';
import { cifrado } from 'src/app/helpers/CifradoFeisfel/cifrado';
import { Huffman } from 'src/app/helpers/CodificacionHuffman/Huffman';

@Component({
  selector: 'app-codificacionhuffmann',
  templateUrl: './codificacionhuffmann.component.html',
  styleUrls: ['./codificacionhuffmann.component.css']
})
export class CodificacionhuffmannComponent implements OnInit {
   prueba:Huffman
   probando:cifrado
   fileName = '';
  constructor() { }

  ngOnInit(): void {
    this.probando = new cifrado("4");
    this.probando.metodoAscii("CF")
    this.probando.DividirBinario();
    this.probando.obtenerllave("1");
    this.probando.corregirTamanoKey()
    this.probando.imprimir()
    this.probando.cifrado();
    //this.probando.imprimir();
   // this.probando.rondas();
   // this.probando.correccionKey();
    
  }



}
