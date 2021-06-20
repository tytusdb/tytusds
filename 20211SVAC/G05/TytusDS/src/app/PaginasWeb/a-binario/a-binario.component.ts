import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';
declare var require: any;
let BST=require('./js/Abinario');
let vis=require('../../../../vis-4.21.0/dist/vis');
let visArbol=require('../../../../vis-4.21.0/dist/vis-network.min')

@Component({
  selector: 'app-a-binario',
  templateUrl: './a-binario.component.html',
  styleUrls: ['./a-binario.component.css','../../../../vis-4.21.0/dist/vis.css']
})
export class ABinarioComponent implements OnInit {
  bst=BST;
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
    this.bst=new BST();
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }
  Add(valor,valorNum){
    if(this.opciones['repeticionArboles']==true){
      if(valor!=""){
        this.bst.append(valor);
        this.graficar();
      }else{
        this.bst.append(parseInt(valorNum));
        this.graficar();
      }
    }else if( this.opciones['repeticionArboles']==false && this.bst.buscar(valor)==null){
      this.graficar();
    }else if( this.opciones['repeticionArboles']==false && this.bst.buscar(valor)!=null){
      alert('Ese valor ya ha sido ingresado, active la opcion de repetir');
    }
  }
  delete(valor){
      this.bst.eliminar(valor);
      this.graficar();
  }
  update(valor,nuevo_valor){
      this.bst.update(valor,nuevo_valor);
      this.graficar();
  }
  graficar(){
    let contenedor= document.getElementById("contenedor");
    let datos=this.bst.Dot();
    let Nodos=datos[0];
    let Edges=datos[1];
    let data={nodes:Nodos,edges:Edges};
    console.log(data);

    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
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
      }, physics:{
        enabled: true,
        barnesHut: {
          gravitationalConstant: -1000,
          centralGravity: 0.3,
          springLength: 95
        }},
      layout:{
        hierarchical: {
          direction: "RL",
          sortMethod: "directed",
          nodeSpacing: 200,
          treeSpacing: 400
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,data,opciones);
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
