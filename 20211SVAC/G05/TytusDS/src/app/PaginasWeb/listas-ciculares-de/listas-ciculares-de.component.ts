import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/ListaCircularDE');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-listas-ciculares-de',
  templateUrl: './listas-ciculares-de.component.html',
  styleUrls: ['./listas-ciculares-de.component.css']
})
export class ListasCicularesDEComponent implements OnInit {
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
    this.lista= new Lista();
  }

  ngOnInit(): void {
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  //LEER ARCHIVOS DE ENTRADA--------------------------------
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      contenido['valores'].forEach(valor => {
        this.Add1(valor);
      });
      this.graficar();
    });

  }
  //Add sin graficar
  Add1(valor){
    //Con la opcion de repetir activada
    if(this.opciones['repeticionLineales']===true){
      this.lista.repeat=true;
    }else{
      this.lista.repeat=false;
    }
    this._Add(valor)
  }
  //AGREGAR DE FORMA NORMAL
  Add(valor){
    //Con la opcion de repetir activada
    if(this.opciones['repeticionLineales']===true){
      this.lista.repeat=true;
    }else{
      this.lista.repeat=false;
    }
    this._Add(valor)
    this.graficar();
  }
  //METODO PARA INSERTAR VALORES
  _Add(valor){
    //Ingresar al final
    if(this.opciones['ingreso']==='final'){
      this.lista.appendF(valor);
      //Ingresar al inicio
    }else if (this.opciones['ingreso']==='inicio'){
      this.lista.appendI(valor);
      //Ingresar de forma ordenada
    }else{
      this.lista.appendO(valor);
    }
  }
  delete(valor){
    let eliminar=this.lista.eliminar(valor);
    if (eliminar!=null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }
  update(valor,new_valor){
    let act=this.lista.actualizar(valor,new_valor)
    if(act!=null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }
  }
  //OPCIONES PARA GRAFICAR------------------------
  graficar():void{
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos=this.lista.Lnodos();
    let Edges=this.lista.Ledges();
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
        arrows:{
          to:{
            enabled:true
          }
        },
        color:{
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        },
        font:{
          color:"white"
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);
  }
  //GUARDAR
  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Lista Circular Doblemente Enlazada",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.lista.Rdatos());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
