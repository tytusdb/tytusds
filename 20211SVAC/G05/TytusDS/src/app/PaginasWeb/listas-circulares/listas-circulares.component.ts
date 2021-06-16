import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Lista=require('./js/ListaCircular');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-listas-circulares',
  templateUrl: './listas-circulares.component.html',
  styleUrls: ['./listas-circulares.component.css','../../../../vis-4.21.0/dist/vis.css']
})
export class ListasCircularesComponent implements OnInit {
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
  //AGREGAR UN NODO---------------------------
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
  //ELIMINAR UN NODO
  delete(valor){
    let eliminar=this.lista.eliminar(valor);
    if (eliminar!==null){
      this.graficar();
    }else{
      alert("Dicho nodo no ha sido ingresado")
    }

  }
  //ACTUALIZAR UN NODO
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
    //OPCIONES ANIMACION:
    /*
    let OpA={
      scale:3,
      locked: false,
        animation: { // -------------------> can be a boolean too!
        duration: 1000,
          easingFunction: "easeInOutQuint"
      }
    }*/
    var k = 0, tick = 10, totalTime = 1000;

    // toy example start x, y coordinates nodes
    var x_start = 0, y_start = 0

    // nr of steps, given tick time and total animation time
    var nrOfSteps = Math.floor( totalTime / tick);
    let positions=grafo.getPositions();
    let timer = setInterval(function(){

      // iteration counter
      k++;

      // lambda (for convex combination)
      var l = k / nrOfSteps;

      for (let i = 0; i < Nodos.length; i++) {

        // get target positions
        var x_target = positions[i].x;
        var y_target = positions[i].y;
        console.log(x_target)

        // compute the convex combination of x_start and x_target to find intermediate x and move node to it, same for y
        var xt = x_start * (1 - l) + x_target * l;
        var yt = y_start * (1 - l) + y_target * l;

        // move node
        grafo.moveNode(i,xt,yt);
      }

      // stop if we have reached nr of steps
      if(k == nrOfSteps){
        clearInterval(timer)
      }
    },tick);
    /*grafo.focus(2,OpA);*/
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
    contenido.valores=contenido.valores.concat(this.lista.Rdatos());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
