import { Component, OnInit,OnDestroy } from '@angular/core';
import { AVL } from 'src/app/helpers/ArbolAVL/AVL';
import { Network, DataSet, Node, Edge, IdType } from 'vis';

@Component({
  selector: 'app-avl',
  templateUrl: './avl.component.html',
  styleUrls: ['./avl.component.css']
})
export class AVLComponent implements OnInit {
  nombre: number|string
  datoBuscar: number|string
  datoEliminar: number|string
  datoAntiguo: number|string
  datoNuevo: number|string
  avl: AVL
  fileName= ""

  public nodes: Node;
  public edges: Edge;
  public network : Network;
  constructor() { }

  ngOnInit(): void {
       this.avl = new AVL()
        var nodes = new DataSet([
      ]);
        // create an array with edges
        var edges = new DataSet([
          
        ]);
      // create a network
      var container = document.getElementById('mynetwork');
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new Network(container, data, options);
      }

    insertardato(){
      
      var ddato =this.avl.add(this.nombre);
      console.log("Dato:" + ddato)

    }

}
