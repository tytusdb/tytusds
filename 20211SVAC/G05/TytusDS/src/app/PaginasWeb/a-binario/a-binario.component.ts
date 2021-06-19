import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;

@Component({
  selector: 'app-a-binario',
  templateUrl: './a-binario.component.html',
  styleUrls: ['./a-binario.component.css']
})
export class ABinarioComponent implements OnInit {
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };
  constructor(private documentoService: DocumentoService) { }

  ngOnInit(): void {
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  Add(valor){

  }
  delete(valor){

  }
  update(valor,nuevo_valor){

  }
  //LEER ARCHIVOS DE ENTRADA--------------------------------
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      contenido['valores'].forEach(valor => {

      });

    });

  }
  //GUARDAR
  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Lista Circular Simplemente Enlazada",
      repeticion:true,
      animacion:10,
      valores: []
    };
    //adentro de concat deberia de ir una lista
    contenido.valores=contenido.valores.concat();
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
