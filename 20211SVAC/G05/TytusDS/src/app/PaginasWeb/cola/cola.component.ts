import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/Cola');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-cola',
  templateUrl: './cola.component.html',
  styleUrls: ['./cola.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class ColaComponent implements OnInit {
  lista=Lista;
  ag = '';
  ag1 = '';
  ag2 = '';
  ag3 = '';
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
          this.lista.insertar2(valor);
          });  alert("Datos guardados");  });
    }
    else{
      this.documentoService.getDocumento(documento).then( contenido => {
        console.log(contenido);
        contenido['valores'].forEach(valor => { 
          this.lista.guardar22(valor);
          });  alert("Datos guardados"); });
    }
    
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Cola",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lista.leer());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'Cola.json');
  }


  Add(valor){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      this.lista.insertar(valor,this.opciones['velocidadLineales']);
      this.ag = '';
      return;
    }
    else{
      //this.lista.repeat=false;
      this.lista.guardarg(valor,this.opciones['velocidadLineales']);
      this.ag = '';
      return;
      console.log("gg");
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
      this.lista.modificar(valor,valor1);
      this.lista.pintar();
      this.ag1 = '';
      this.ag2 = '';
      return;
      
    }
    else{
      //this.lista.repeat=false;
      this.lista.modificar2(valor,valor1);
      this.lista.pintar();
      this.ag1 = '';
      this.ag2 = '';
      return;
    }

  }

  actualizar(){
    this.lista.pintar();
  }
}
