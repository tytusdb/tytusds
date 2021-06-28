import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { TablaHashAbierta } from './ts/tabla-hash';

@Component({
  selector: 'app-hash-abierto',
  templateUrl: './hash-abierto.component.html',
  styleUrls: ['./hash-abierto.component.css']
})
export class HashAbiertoComponent implements OnInit {

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
  valorEliminar = '';
  valorAntiguo = '';
  valorActualizar = '';
  valorBuscar = '';

  primero = true;

  hash: TablaHashAbierta;


  constructor(private documentoService: DocumentoService) {
    this.hash = new TablaHashAbierta();
  }

  ngOnInit(): void {}

  getOpciones(opciones: any): void {
    this.opciones = opciones;
    console.log(opciones);
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
    });
  }

  agregar(): void {
    if (this.valorAgregar.length === 0) return;
    
    if (this.primero) {
      this.hash.llenarArreglo(this.opciones['sizeNoLineales'], this.opciones['rangoHashMinimo'], this.opciones['rangoHashMaximo']);
      this.primero = false;
    }

    let p = this.hash.hashMultiplicacion(this.valorAgregar, this.opciones['constante']);
    console.log(p);

    /*if (this.opciones['funcionHash'] === "simple") {
      let p = this.hash.hashSimple(this.valorAgregar, this.opciones['sizeNoLineales']);
      console.log(p);
    } else if (this.opciones['funcionHash'] === "division") {
      let p = this.hash.hashDivision(this.valorAgregar, this.opciones['sizeNoLineales']);
      console.log(p);
    }else {
      let p = this.hash.hashMultiplicacion(this.valorAgregar, this.opciones['sizeNoLineales'], this.opciones['constante']);
      console.log(p);
    }*/
  }

  eliminar(): void {
    if (this.valorEliminar.length === 0) return;
  }

  actualizar(): void {
    if (this.valorAntiguo.length === 0 || this.valorActualizar.length === 0) return;
  }

  buscar(): void {
    if (this.valorBuscar.length === 0) return;
  }

  guardar(): void {

  }

}
