import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/Pila');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css','../../../../css/bootstrap.min.css','../../../../vis-4.21.0/dist/vis.css']
})
export class PilaComponent implements OnInit {
  lista=Lista;
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) {
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
          this.lista.guardar2(valor);
          });this.lista.pintar2(); });
    }
    else{
      this.documentoService.getDocumento(documento).then( contenido => {
        console.log(contenido);
        contenido['valores'].forEach(valor => { 
          this.lista.guardarg(valor);
          }); this.lista.pintar2(); });
    }
    
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Pila",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lista.leer());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'pila.json');
  }





  Add(valor){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      this.lista.guardar(valor);
    }
    else{
      //this.lista.repeat=false;
      this.lista.guardarg(valor);
      console.log("gg");
    }



  
    
  
    //this.graficar();
  }
  delete(){
    this.lista.desapila();
    

  }
 bus(valor){
    let bus= this.lista.buscar(valor);
    if (bus!==null){
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }

  modi(valor,valor1){
    if(this.opciones['repeticionLineales']===true){
      //this.lista.repeat=true;
      this.lista.modificar(valor,valor1);
      //this.lista.pintar();
    }
    else{
      //this.lista.repeat=false;
      this.lista.modificar2(valor,valor1);
      //this.lista.pintar();
    }

  }

  actualizar(){
    this.lista.pintar();
  }




  //OPCIONES PARA GRAFICAR------------------------
  //

}
