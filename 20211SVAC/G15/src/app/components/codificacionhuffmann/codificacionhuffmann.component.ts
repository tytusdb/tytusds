import { Component, OnInit } from '@angular/core';
import { cifrado } from 'src/app/helpers/CifradoFeisfel/cifrado';
import { Huffman } from 'src/app/helpers/CodificacionHuffman/Huffman';
import { LZW } from 'src/app/helpers/LZW/LZW';

@Component({
  selector: 'app-codificacionhuffmann',
  templateUrl: './codificacionhuffmann.component.html',
  styleUrls: ['./codificacionhuffmann.component.css']
})
export class CodificacionhuffmannComponent implements OnInit {
   prueba:Huffman
   probando:cifrado
   prueba2:LZW
   fileName = '';
  constructor() { }

  ngOnInit(): void {
    this.prueba2 = new LZW();
    this.prueba2.iniciarValores("Pablo papa de pablito");
    this.prueba2.LeerCadena("Pablo papa de pablito")
    //this.prueba2.imprimir();

    
  }



}
