import { Component, OnInit, Input, ViewChild, ElementRef,AfterViewInit, Renderer2, ComponentFactoryResolver} from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Flecha } from '../impl-canvas/flecha';
import { FlechaCompuesta } from '../impl-canvas/flecha-compuesta';
import { RectanguloNodo } from '../impl-canvas/rectangulo-nodo';
import { Network, DataSet } from 'vis';
declare var vis:any

import BST from './clase-arbol'
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-abb',
  templateUrl: './abb.component.html',
  styleUrls: ['./abb.component.css']
})
export class AbbComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  //@ViewChild("svgNetwork") svgNetworkContainer: ElementRef;
  
  bst = new BST()
  
  x:string = ''
  public network:any

  
 // nombre:string = "Maria"
  //apellido:string = "Perez"
  //alumno:any = {
    //nombre: "Carlos",
    //apellido:"Najera",
    //edad:26
  //}
  //inputNuevo:string = "Hola soy un nuevo input"
  //correo:string = ''
  //password:string = ''
  constructor() { }

  ngOnInit(): void {
    
  }

  Iniciar(){
    //console.log(this.correo)
    //console.log(this.password)
  }
  
  Insertar(){
    //console.log("IMPRIMIENDO EL INSERTAR")
    //if( typeof this.x) 
    let y = parseInt(this.x)
    console.log(y)
    if(typeof parseInt(this.x) === 'number'){
      console.log("SI ES NUMERO")
      this.bst.insert(y)
    }else{
      console.log("NO ES NUMERO")
      this.bst.insert(this.x)
    }
    //this.bst.insert(y)
    //console.log(this.x)
    console.log("RAIZ",this.bst.root)
    //console.log("X no vale NADA")
    this.x = ''
    //this.x = this.bst.inOrder(this.bst.root,this.x)
    //this.bst.inOrder(this.bst.root)
    console.log("----------------------")
    //console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = '' 
    this.visit()
  }

  Eliminar(){
    console.log("IMPRIMIENDO EL ELIMINAR")
    this.bst.eliminar(this.x)
    console.log(this.x)
    this.x = ''
    this.visit()
  }


  InsertarPrueba(){
    console.log(this.x)
    this.bst.insert(this.x)
    console.log(this.x)
    this.bst.insert(50)
    this.bst.insert(25)
    this.bst.insert(75)
    this.bst.insert(35)
    this.bst.insert(10)//1 10 15 25 32 35 50 55 60 75 79 81
    this.bst.insert(81)
    this.bst.insert(15)
    this.bst.insert(1)
    this.bst.insert(32)
    this.bst.insert(79)
    this.bst.insert(60)
    this.bst.insert(55)
    this.x = ''
    //this.x = this.bst.inOrder(this.bst.root,this.x)
    console.log("----------------------")
    var x = this.bst.search(this.bst.root,5)
    console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = ''
    this.bst.eliminar(25)
    this.bst.eliminar(60)
    //this.x = this.bst.inOrder(this.bst.root,this.x)
    console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = ''
  }

  visit(){
    this.drawSvgNetwork()
    var treeData = this.getTreeData()
    this.loadVisTree(treeData)
  }

  loadVisTree(treedata) {
    var options = {
      nodes: {
          widthConstraint: 100,
      },        
      layout: {
          hierarchical: {
              levelSeparation: 100,
              nodeSpacing: 100,
              parentCentralization: true,
              direction: 'UD',        // UD, DU, LR, RL
              sortMethod: 'directed',  // hubsize, directed
              shakeTowards: 'roots'  // roots, leaves                        
      },
      },                        
  };
    var container = this.networkContainer.nativeElement;
    this.network = new vis.Network(container, treedata, options);

    var that = this;
    this.network.on("hoverNode", function (params) {                  
      console.log('hoverNode Event:', params);
    });
    this.network.on("blurNode", function(params){
      console.log('blurNode event:', params);      
    });
  }


  getTreeData() {  
    //nodos.push(5)
    
    //nodos = this.bst.dotgenarray(this.bst.root)
    //this.bst.dotgenarray(this.bst.root)
    
    //nodos.push(this.bst.dotgenarray(this.bst.root,prueba))
    //nodos.push({id:10, label:'X10'})
    //console.log(nodos )
    
    var nodes =[
        {id: 1, label: 'Node 1', title: 'I am node 1!'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'},
        {id: 6, label: 'Node 6'}
    ];

    // create an array with edges
    this.bst.dot = '{'
    this.bst.dotgen(this.bst.root)
    this.bst.dot += '}'
    var DOTstring = this.bst.dot
    var parsedData = vis.parseDOTNetwork(DOTstring);
    console.log("PARSED",parsedData)
    console.log(this.bst.root)
    console.log(this.bst.dot)
    this.bst.dot = ''
    console.log("PARSED",parsedData)

    var edges = [
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 5, to: 6}
    ];
    //this.bst.inOrder(this.bst.root)
    //this.bst.dotgenarray(this.bst.root)
    //console.log("X",nodes)
    //console.log("Y",this.bst.datagraph)
    //console.log("X1",edges)
    //console.log("Y1",this.bst.edgegraph)
    var treeData = {
      nodes:  parsedData.nodes,
      edges: parsedData.edges
    };
    this.bst.datagraph = []
    this.bst.edgegraph = []
    return treeData;
  }

  drawSvgNetwork() {
    var nodes = null;
     var edges = null;
     var network = null;

     var DIR = 'img/refresh-cl/';
     var LENGTH_MAIN = 150;
     var LENGTH_SUB = 50;

     /*var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="390" height="65">' +
         '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
         '<foreignObject x="15" y="10" width="100%" height="100%">' +
         '<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial; font-size:30px">' +
         ' <em>I</em> am' +
         '<span style="color:white; text-shadow:0 0 20px #000000;">' +            
           ' HTML in SVG!</span>' +

         // * THIS IMAGE IS NOT RENDERING * 
         '<i style="background-image: url(https://openclipart.org/download/280615/July-4th-v2B.svg);"></i>' +

         '</div>' +
         '</foreignObject>' +
         '</svg>';


     var url = "data:image/svg+xml;charset=utf-8,"+ encodeURIComponent(svg);*/

// Create a data table with nodes.
           this.bst.datagraph = [];

           // Create a data table with links.
           this.bst.edgegraph = [];

           //nodes.push({id: 1, label: 'Get HTML', image: url, shape: 'image'});
           //nodes.push({id: 2, label: 'Using SVG', image: url, shape: 'image'});
           //edges.push({from: 1, to: 2, length: 300});

           // create a network
          // var container = this.svgNetworkContainer.nativeElement;            

           //var container = document.getElementById('mynetwork');
           var data = {
               nodes: this.bst.datagraph,
               edges: this.bst.edgegraph
           };
           var options = {
            nodes: {
                widthConstraint: 20,
            },        
            layout: {
                hierarchical: {
                    levelSeparation: 100,
                    nodeSpacing: 100,
                    parentCentralization: true,
                    direction: 'UD',        // UD, DU, LR, RL
                    sortMethod: 'directed',  // hubsize, directed
                    shakeTowards: 'roots'  // roots, leaves                        
            },
            },                        
        };
           window.vis = require('vis-network/standalone');
           //network = new vis.Network(container, data, options);
          // this.network = new vis.Network(container, data, options);
 } 

}
