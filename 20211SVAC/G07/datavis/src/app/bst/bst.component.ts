import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as vis from 'vis';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
let arbolData = {nodes: nodes,
                edges: edges};

 class noda {
    index: number;
    value: number;
    right: noda;
    left: noda;
  constructor(value,index) {
    this.index = index;
    this.value= value;
    this.right = null;
    this.left = null;
  }
}
  //nodol.anterior.index

class bstree {
  root:noda;
  constructor() {
    this.root = null;
  }
  add(value){
    if(this.root==null){
      this.root= new noda(value,1)
      nodes.update(
        {id:this.root.index, label:this.root.value}
      );
    }else{
      this._addnode(value,this.root);

    }
  }
  _addnode(value,nodo){

    if(value<nodo.value){
      if (nodo.left=!null) this._addnode(value,nodo.left);
      else nodo.left = new noda(value,1);

      nodes.update(
        {id:nodo.left.index, label:nodo.left.value}
      );

      edges.update(
        {from:nodo.index, to: nodo.left.index, length:10}
      )

  }else if(value>nodo.value){
      if(nodo.right=!null) this._addnode(value, nodo.right);
      else nodo.right = new noda(value,1);

      nodes.update(
        {id:nodo.right.index, label:nodo.right.value}
      );

      edges.update(
        {from:nodo.index, to: nodo.right.index, length:10}
      )

    }
  }
}
 
  


@Component({
  selector: 'app-bst',
  templateUrl: './bst.component.html',
  styleUrls: ['./bst.component.css']
})


export class BstComponent implements OnInit {
  
  addNode(value){}

  @ViewChild('mynetwork', {static: false}) el: ElementRef;

  tree = new bstree();

  
  NvVal = new FormControl('');
  public network: any;
  constructor() { }
  actualvval=0;
  i = 0;
  ngOnInit(): void {
  }

  ngAfterViewInit(){
    var options = {
      layout: {
        hierarchical: {
          direction: "UD",
          sortMethod: "directed",
        },
      },
      edges: {
        arrows: "to",
      },
    };

    var container = this.el.nativeElement;
    this.network = new vis.Network(container,arbolData,options);
  }

  addtotree(value,tree){

    if(tree.root==null){
      tree.root= new noda(value,this.i)
      
      nodes.update(
        {id:tree.root.index, label:tree.root.value}
      );
      
    }else{
      
      this._addtotree(value,tree.root);
      

    }
  }
  _addtotree(value,nodo){

    if(+value<+nodo.value){

      if (nodo.left==null) {
        this.i++;
        nodo.left = new noda(value,this.i);

        console.log('Nodo; '+this.i+' Valor: '+this.actualvval);
        console.log(nodo.index+'->'+this.i);
        
        nodes.update(
          {id:this.i, label:this.actualvval}
        );

        edges.update(
          {from:nodo.index, to: this.i, length:10}
        );


      }else {
        this._addtotree(value,nodo.left);
        
      }
  }else if(+value>+nodo.value){
      if(nodo.right==null){
        this.i++;
        nodo.right = new noda(value,this.i);

        console.log('Nodo; '+this.i+' Valor: '+this.actualvval);
        console.log(nodo.index+'->'+this.i);
        

        nodes.update(
          {id:this.i, label:this.actualvval}
        );

        edges.update(
          {from:nodo.index, to: this.i, length:10}
        );

        

      }else{ 
        this._addtotree(value, nodo.right);
      }
    }
  }

  AddNode(value: any){
    this.actualvval=value;
    this.addtotree(value,this.tree);
  }


}
