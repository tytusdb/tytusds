import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let Matriz=require('./js/MatrizDispersa');
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-mdispersa',
  templateUrl: './mdispersa.component.html',
  styleUrls: ['./mdispersa.component.css']
})
export class MDispersaComponent implements OnInit {
  matriz=Matriz;
  grafo;
  SC_Cabecera=true;
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
    this.matriz=new Matriz();
  }

  ngOnInit(): void {
  }
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  //AÑADIR-----------------------------------------------------------------------------------------
  Add(valor,x,y){
    //que no hayan casillas vacias:
    if(valor!="" && x!="" && y!=""){
      //que x y y sean numero, isNan devuelve falso si al intentar convertir un string a numero no retorne un NaN
      //por lo tanto dicho string si se puede a un numero y no es una palabra insertada
      if(isNaN(x)==false && isNaN(y)==false){
        //superadas las restricciones se debe de verificar si el valor ingresado en valor es un string o un numero
        valor=this.Vseguro(valor);
        x=parseInt(x);
        y=parseInt(y);
        if(x>0 && y>0){
          let existe=this.matriz.BPosicion(x,y);
          if(existe==null){
          this.matriz.append(valor,x,y);
          this.graficar();
          }
          else{
            alert('dicha posicion se encuentra ocupada');
          }
        }else {
          alert('Ingrese posiciones mayores a 0');
        }
      }
    }
  }
  //DELETE-----------------------------------------------------------------------------------------
  delete(valor){
    if(isNaN(valor)==false){
      valor=parseInt(valor)
    }
    this.matriz.deleteP(valor);
    this.graficar();
  }
  //UPDATE-----------------------------------------------------------------------------------------
  update(valor,new_valor){
    valor=this.Vseguro(valor);
    new_valor=this.Vseguro(new_valor);
    let update=this.matriz.updateP(valor,new_valor);
    if (update==true) {
      this.graficar();
    }
    else {
      alert('El valor a sustituir no existe en la matriz');}

  }
  //PARA EVITAR ERRORES DE NUMEROS Y STRINGS
  Vseguro(valor){
    if(isNaN(valor)==false){
      valor=parseInt(valor);
    }
    return valor;
  }

  graficar(){
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos,Edges;
    if(this.SC_Cabecera==true){
    Nodos=this.matriz.Lnodos();
    Edges=this.matriz.Ledges();
    } else{
      Nodos=this.matriz.LnodosSC();
      Edges=this.matriz.LedgesSC();
    }
    //se escoge el div a utilizar como contenedor
    let contenedor= document.getElementById("contenedor");
    let datos={nodes:Nodos,edges:Edges};
    let opciones={
      edges:{
        arrows:{
          to:true,
          from:true
        },
        color:{
          color:"#013ADF"
        }
      },
      nodes:{
        color:{
          border:"white"
        },
        font:{
          color:"white"
        }
      },
      physics:{
        enabled: false},
      layout:{
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
          nodeSpacing: 200,
          treeSpacing: 400
        }
      }
    };
    //------------------------------------------------------------------------
    this.grafo= new vis.Network(contenedor,datos,opciones);
  }
  buscar(valor){
    if(valor!=""){
      valor=this.Vseguro(valor);
      let nodo=this.matriz.buscarP(valor);
      if(nodo!=null){
        //id:F#C#
        let id=`F${nodo.x}C${nodo.y}`
        let options={
          scale: 10,
          offset: {x:10, y:10},
          locked: false,
          animation: {
            //duración en ms
            duration: 1500,
            easingFunction: "easeInOutQuad"
          }
        }

        this.grafo.focus(id,options);
      }else{
        alert('Dicho valor no ha sido ingresado a la matriz');
      }
    }
  }
  //GUARDAR
  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Compuesta",
      nombre: "Matriz Dispersa",
      repeticion:true,
      animacion:10,
      valores: []
    };
    contenido.valores=contenido.valores.concat(this.matriz.Rdatos());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }
}
