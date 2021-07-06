import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/Cola-Prioridad');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-cp',
  templateUrl: './cp.component.html',
  styleUrls: ['./cp.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class CpComponent implements OnInit {
  lista=Lista;
  ag = '';
  ag0 = '';
  ag1 = '';
  ag2 = '';
  ag3 = '';
  agx = '';
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService)  {
  this.lista=new Lista();
  
  }

  ngOnInit(): void {
  }

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

  getDocumento(documento: any): void{
    if(this.opciones['repeticionLineales']===true){
      this.documentoService.getDocumento(documento).then( contenido => {
        console.log(contenido);
        contenido['valores'].forEach(valor => { 
          this.lista.guardar(valor['prioridad'],valor['valor']);
          //this.lista.insertar2(valor);
          }
          ); alert("Datos guardados"); 
          this.lista.buscarespecial(this.opciones['velocidadLineales'])});  
    }else{
      this.documentoService.getDocumento(documento).then( contenido => {
        contenido['valores'].forEach(valor => { 
          this.lista.guardar2(valor['prioridad'],valor['valor']);
          }); alert("Datos guardados");  this.lista.buscarespecial(this.opciones['velocidadLineales']) });
    }
    //this.lista.buscarespecial();
    
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Cola De Prioridad",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lista.leer());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'ColaPrioridad.json');
  }


  Add(valor,valor1){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      this.lista.guardar(valor,valor1);
      this.lista.buscarespecial(this.opciones['velocidadLineales'])
      this.ag = '';
      this.ag0 = '';
      this.agx = '';
      return;
    }
    else{
      //this.lista.repeat=false;
      this.lista.guardar21(valor,valor1,this.opciones['velocidadLineales']);
      //this.lista.buscarespecial(this.opciones['velocidadLineales'])
      this.ag = '';
      this.agx = '';
      return;
    }
    //this.graficar();
  }
  delete(){
    this.lista.eliminar();
    
    //this.graficar();
  }
  //OPCIONES PARA GRAFICAR------------------------
  //

  bus(valor){
     this.lista.buscar(valor,this.opciones['velocidadLineales']);
    this.ag3 = '';
      return;
  }

  modi(valor,valor1){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      //this.lista.modificar(valor,valor1);
      this.lista.modificar(valor,valor1);
      this.ag1 = '';
      this.ag2 = '';
      return;
    }else{
      //this.lista.repeat=false;
      this.lista.modificar2(valor,valor1);
      this.ag1 = '';
      this.ag2 = '';
      return;
    }

  }

  actualizar(){
    this.lista.pintar(this.opciones['velocidadLineales']);
  }
}