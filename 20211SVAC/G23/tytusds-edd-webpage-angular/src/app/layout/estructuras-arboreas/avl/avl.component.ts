import { Component, OnInit, Input, ViewChild, ElementRef,AfterViewInit, Renderer2, ComponentFactoryResolver} from '@angular/core';

declare var vis:any
import { AVL } from './clas-avl';

@Component({
  selector: 'app-avl',
  templateUrl: './avl.component.html',
  styleUrls: ['./avl.component.css']
})
export class AvlComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  bst = new AVL()
  x:string = ''
  public network:any

  constructor() { }

  ngOnInit(): void {
    
  }

  Insertar(){
    let y = parseInt(this.x)
    console.log(y)
    if(typeof parseInt(this.x) === 'number'){
      console.log("SI ES NUMERO")
      this.bst.put(y)
    }else{
      console.log("NO ES NUMERO")
      this.bst.put(this.x)
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
    this.bst.delete(this.x)
    console.log(this.x)
    this.x = ''
    this.visit()
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
    //console.log("PARSED",parsedData)
    console.log("RAIz",this.bst.root)
    console.log("DOT",this.bst.dot)
    this.bst.dot = ''
    //console.log("PARSED",parsedData)

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
    //this.bst.datagraph = []
    //this.bst.edgegraph = []
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
          nodes = []
           //this.bst.datagraph = [];

           // Create a data table with links.
           edges = []
           //this.bst.edgegraph = [];

           //nodes.push({id: 1, label: 'Get HTML', image: url, shape: 'image'});
           //nodes.push({id: 2, label: 'Using SVG', image: url, shape: 'image'});
           //edges.push({from: 1, to: 2, length: 300});

           // create a network
          // var container = this.svgNetworkContainer.nativeElement;            

           //var container = document.getElementById('mynetwork');
           var data = {
               nodes: nodes,
               edges: edges
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
