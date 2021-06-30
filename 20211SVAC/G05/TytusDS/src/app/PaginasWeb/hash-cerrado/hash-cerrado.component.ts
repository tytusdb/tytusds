import { Component, OnInit } from '@angular/core';
import { TablaHashCerrada } from './ts/tabla-hash-cerrada';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-hash-cerrado',
  templateUrl: './hash-cerrado.component.html',
  styleUrls: ['./hash-cerrado.component.css']
})
export class HashCerradoComponent implements OnInit {

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

  hash: TablaHashCerrada;

  constructor(private documentoService: DocumentoService) {
    this.hash = new TablaHashCerrada();
  }

  ngOnInit(): void {}

  
  getOpciones(opciones: any): void {
    this.opciones = opciones;
    console.log(opciones);
  }

  getDocumento(documento: any): void {
    this.documentoService.getDocumento(documento).then( contenido => {
      if (contenido['size'] !== undefined) {
        this.opciones['sizeNoLineales'] = contenido['size'];
      }
      if (contenido['funcion'] !== undefined) {
        this.opciones['funcionHash'] = contenido['funcion'];
      }
      if (contenido['minimo'] !== undefined) {
        this.opciones['rangoHashMinimo'] = contenido['minimo'];
      }
      if (contenido['maximo'] !== undefined) {
        this.opciones['rangoHashMinimo'] = contenido['maximo'];
      }
      if (contenido['prueba'] !== undefined) {
        this.opciones['pruebaHashCerrado'] = contenido['prueba'];
      }
      
      contenido['valores'].forEach(valor => {
        this.valorAgregar = `${valor}`;
        this.agregar(true);
      });
      this.graficar();
    });
  }

  agregar(esperar?: boolean): void {
    if (this.valorAgregar.length === 0) return;

    if (this.primero) {
      this.hash.llenarArreglo(this.opciones['sizeNoLineales'], this.opciones['rangoHashMinimo'], this.opciones['rangoHashMaximo'], this.opciones['pruebaHashCerrado'], this.opciones['funcionHash'], this.opciones['constante']);
      this.primero = false;
    }

    this.hash.agregar(this.valorAgregar);
    this.valorAgregar = '';
    console.log(this.hash.arreglo);
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

  graficar(): void {
   
  }

  guardar(): void {
  }


}
