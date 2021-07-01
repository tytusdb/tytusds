import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let LBST=require('./js/ABinario');
let vis=require('../../../../vis-4.21.0/dist/vis');
@Component({
  selector: 'app-l-bst',
  templateUrl: './l-bst.component.html',
  styleUrls: ['./l-bst.component.css']
})
export class LBSTComponent implements OnInit {
  lbst=LBST;
  grafo;
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
    this.lbst=new LBST();
  }

  ngOnInit(): void {

  }
  //LEER ARCHIVOS DE ENTRADA------------------------------------------------------------------
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      contenido['valores'].forEach(valor => {
        //valor es el diccionario
        let principal,secundario;
        principal=valor['principal'];
        secundario=valor['secundario'];
        this.lbst.append(principal,secundario);
      });
      this.graficar();
    });

  }
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  Add(columna,valor){
    //que no hayan casillas vacias:
    if(valor!="" && columna!=""){
      //que x y y sean numero, isNan devuelve falso si al intentar convertir un string a numero no retorne un NaN
      //por lo tanto dicho string si se puede a un numero y no es una palabra insertada
        //superadas las restricciones se debe de verificar si el valor ingresado en valor es un string o un numero
        valor=this.Vseguro(valor);
        columna=this.Vseguro(columna);
        this.lbst.append(columna,valor);
        this.graficar();
    }
  }
  Actualizar(valor,valor_nuevo){
    valor=this.Vseguro(valor);
    valor_nuevo=this.Vseguro(valor_nuevo);
    let nodo=this.lbst.modificar(valor,valor_nuevo);
    if(nodo==true){
      this.graficar();
    }
  }


  Vseguro(valor){
    if(isNaN(valor)==false){
      valor=parseInt(valor);
    }
    return valor;
  }
  buscar(valor){
    if(valor!=""){
      valor=this.Vseguro(valor);
      let lista=this.lbst.Mbuscar(valor);
      let cabecera=lista[0];
      let nodo=lista[1];
      let numCabecera=lista[2];
      if(nodo!=null){
        //id:F#C#
        let id=`C${cabecera.valor}(${numCabecera})N${nodo.nivel}(${nodo.valor})`
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
  delete(valor){
    valor=this.Vseguro(valor);
    let nodo=this.lbst.delete(valor)
    if (nodo==true){
      this.graficar();
    }
  }

  graficar(){
    //Retorno de la lista con los objetos de nodos y edges
    let Nodos,Edges;
    Nodos=this.lbst.Rlnodos();
    Edges=this.lbst.Rledges();
    console.log(Nodos);
    console.log(Edges);
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
  //GUARDAR
  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Compuesta",
      nombre: "Construccion",
      animacion:10,
      valores: []
    };
    //this.matriz.Rdatos()
    contenido.valores=contenido.valores.concat(this.lbst.Rdatos());
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
