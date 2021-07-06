import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CAMINO } from 'src/app/helpers/models/camino';
import { EDGE } from 'src/app/helpers/models/edge';
import { NODO } from 'src/app/helpers/models/nodo';
import { DataSet } from 'vis-data';
import { Edge, Network } from 'vis-network';
@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit, AfterViewInit {
  @ViewChild('visNetwork', { static: false }) visNetwork!: ElementRef;
  @ViewChild('visNetwork2', { static: false }) visNetwork2!: ElementRef;
  private networkInstance: any;
  constructor() {}
  id:number = 1
  inicio:string='';
  final:string='';
  edge: EDGE = {
    id: '',
    from: '',
    to: '',
    label:'',
    arrows: '',
    LETRA: '',
    LETRA2: '',
    color: 'blue'

  }
  edge2: EDGE = {
    id: '',
    from: '',
    to: '',
    label:'',
    arrows: '',
    LETRA: '',
    LETRA2: '',
    color: 'blue'
  }
  CAMINOS:CAMINO[] = [];
  DIRECCION:any[] = [];
  MENOR: CAMINO ={
    letra:'',
    PADRE: null,
    nodos: [],
    valor: -1,
    id: '',
    nivel: 0
  }
  nodes:DataSet<NODO> = new DataSet<NODO>();
  Visitados:DataSet<NODO> = new DataSet<NODO>();
  edges:DataSet<EDGE> = new DataSet<EDGE>();
  nodes2:DataSet<NODO> = new DataSet<NODO>();
  edges2:DataSet<EDGE> = new DataSet<EDGE>();
  nodo: NODO = {
    id: '',
    label: '',
    hijos:new DataSet<EDGE>()
  }
  nodo2: NODO = {
    id: '',
    label: '',
    hijos:new DataSet<EDGE>()
  }
  ngOnInit(): void {
  }
ngAfterViewInit(): void {
  this.IniciarGrafica1();
  this.IniciarGrafica2();
  this.prueba();
}

  IniciarGrafica1(){
    var options = {
      layout: {
        hierarchical: {
            levelSeparation: 100,
            nodeSpacing: 100,
            parentCentralization: true,
            direction: 'LR',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
            shakeTowards: 'roots'  // roots, leaves
        },
      },
    };
    var nodes:DataSet<any> = this.nodes;
    var edges:DataSet<any> = this.edges;
    const data = { nodes, edges };
    const container = this.visNetwork;
    this.networkInstance = new Network(container.nativeElement, data, options);
  }
  prueba(){
    this.nodes.add({id: 'A',
    label: 'A',
    hijos:new DataSet<EDGE>()});
    this.nodes.add({id: 'B',
    label: 'B',
    hijos:new DataSet<EDGE>()});
    this.nodes.add({id: 'C',
    label: 'C',
    hijos:new DataSet<EDGE>()});
    this.nodes.add({id: 'D',
    label: 'D',
    hijos:new DataSet<EDGE>()});
    this.nodes.add({id: 'E',
    label: 'E',
    hijos:new DataSet<EDGE>()});
    this.nodes.add({id: 'F',
    label: 'F',
    hijos:new DataSet<EDGE>()});
    /*HIJOS A*/
    this.edge.from='A';
    this.edge.to='B';
    this.edge.label='5';
    this.addEdge();
    this.edge.from='A';
    this.edge.to='C';
    this.edge.label='6';
    this.addEdge();

    /*HIJOS B*/
    this.edge.from='B';
    this.edge.to='C';
    this.edge.label='6';
    this.addEdge();
    this.edge.from='B';
    this.edge.to='E';
    this.edge.label='5';
    this.addEdge();
    this.edge.from='B';
    this.edge.to='D';
    this.edge.label='3';
    this.addEdge();
    /*HIJOS C*/
    this.edge.from='C';
    this.edge.to='E';
    this.edge.label='2';
    this.addEdge();
    /*HIJOS D*/
    this.edge.from='D';
    this.edge.to='E';
    this.edge.label='3';
    this.addEdge();
    this.edge.from='D';
    this.edge.to='F';
    this.edge.label='4';
    this.addEdge();
    /*HIJOS E*/
    this.edge.from='E';
    this.edge.to='F';
    this.edge.label='1';
    this.addEdge();
    /*HIJOS F*/


  }
  IniciarGrafica2(){
    var options = {
      layout: {
        hierarchical: {
            levelSeparation: 100,
            nodeSpacing: 100,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
            shakeTowards: 'roots'  // roots, leaves
        },
        edges: {
          color : {
            inherit: false
          }
        },
      },
    };
    var nodes:DataSet<any> = this.nodes2;
    var edges:DataSet<any> = this.edges2;
    const data = { nodes, edges };
    const container = this.visNetwork2;
    this.networkInstance = new Network(container.nativeElement, data, options);
  }
  addNode (){
    this.nodo.id = this.nodo.label;
    let newNodo: NODO = {
      id: this.nodo.id,
      label: this.nodo.label,
      hijos: new DataSet<EDGE>()
    };
    if (this.nodes.get(newNodo.id)==null) {
      this.nodes.add(newNodo);
    }
    this.nodo.hijos.clear();
    this.nodo.id='';
    this.nodo.label='';
  }
  addEdge(){
      let comprobar = this.nodes.get(this.edge.from);
      let comprobar2 = this.nodes.get(this.edge.to);
      if (comprobar && comprobar2) {
        let newEdge:EDGE = {
          id: this.edge.from+this.edge.to+this.edge.label,
          from: this.edge.from,
          to: this.edge.to,
          label: this.edge.label,
          arrows: this.edge.arrows,
          LETRA: this.edge.from,
          LETRA2: this.edge.to,
          color: 'blue'
        }
        let newEdge2:EDGE = {
          id: this.edge.from+this.edge.to+this.edge.label,
          from: this.edge.to,
          to: this.edge.from,
          label: this.edge.label,
          arrows: this.edge.arrows,
          LETRA: this.edge.from,
          LETRA2: this.edge.to,
          color: 'blue'
        }
        this.edges.add(newEdge);
        comprobar.hijos.add(newEdge);
        comprobar2.hijos.add(newEdge2);
        this.edge.id='';
        this.edge.to='';
        this.edge.from='';
        this.edge.label='';
      }
  }



costo(){
  /*VACIAMOS LOS NODOS Y EDGES */
  this.nodes2.clear();
  this.edges2.clear();
  this.CAMINOS = [];
  this.DIRECCION = [];
  this.Visitados.clear();
  let comprobar = this.nodes.get(this.inicio);
  let acumulado = 0;
  /*CREAMOS EL NODO INICIAL CON SUS HIJOS*/
  if (comprobar!= null) {
    let lista:string[]=[];
    let CAMINO_INICIAL:CAMINO={
      nodos:[],
      PADRE:null,
      valor: Number(0),
      letra: comprobar.label,
      id: this.inicio,
      nivel:-1
    }
    this.Visitados.add(comprobar);
    this.nodes2.add(comprobar);
    comprobar.hijos.forEach(hijo=>{
      let NEWCAMINO:CAMINO={
        nodos:[],
        PADRE: CAMINO_INICIAL,
        valor: Number(hijo.label),
        letra: hijo.LETRA2,
        id: hijo.to+this.id,
        nivel: this.id
      }
      let newNodo:NODO = {
        id:hijo.to+this.id,
        label: hijo.to,
        hijos: new DataSet<EDGE>()
      }
      CAMINO_INICIAL.nodos.push(NEWCAMINO);
      this.DIRECCION.push(NEWCAMINO);
      if (this.MENOR.valor>Number(hijo)) {
        lista = []
      }
      if (this.MENOR.valor==-1 || this.MENOR.valor>=Number(hijo.label)) {
        if (this.MENOR.valor == Number(hijo.label) && this.MENOR.letra == hijo.LETRA2) {

        }else{
          lista.push(hijo.LETRA2);
          lista.sort();
          if (lista[0]==hijo.LETRA2) {
            this.MENOR = NEWCAMINO;
          }
        }
      }
      let newEdge:EDGE = {
        id:hijo.to+this.id,
        from: hijo.from,
        to: hijo.to+this.id,
        label: hijo.label,
        arrows: hijo.arrows,
        LETRA: hijo.LETRA,
        LETRA2: hijo.LETRA2,
        color: 'blue'
      }
      this.nodes2.add(newNodo);
      this.edges2.add(newEdge);
    })

    /*WHILE*/
    this.inc();
    while(true){
      if (this.MENOR.letra == this.final) {
        let m = this.MENOR;
        let n = 0;
        while(m.PADRE!=null){
          let vari = this.edges2.get(m.id);
          if (vari) {
            this.edges2.remove(m.id);
            vari.color = 'red'
            this.edges2.add(vari);
          }
          if(this.MENOR.PADRE!=null){
            m = m.PADRE;
          }
        }
        let vari = this.edges2.get(this.MENOR.id);
        if (vari) {
          vari.color = 'red'
        }
        break;
      }
      let key = this.DIRECCION.indexOf(this.MENOR);
      delete this.DIRECCION[key];
      comprobar = this.nodes.get(this.MENOR.letra);
      if (comprobar) {
        this.Visitados.add(comprobar);
        comprobar.hijos.forEach(hijo=>{
          let NEWCAMINO:CAMINO={
            nodos:[],
            PADRE: this.MENOR,
            valor: Number(hijo.label)+this.MENOR.valor,
            letra: hijo.LETRA2,
            id: hijo.to+this.id,
            nivel: this.id
          }
          acumulado = Number(hijo.label)+this.MENOR.valor;
          let newNodo:NODO = {
            id:hijo.to+this.id,
            label: hijo.to,
            hijos: new DataSet<EDGE>()
          }
          this.MENOR.nodos.push(NEWCAMINO);
          this.DIRECCION.push(NEWCAMINO);
          let newEdge:EDGE = {
            id:hijo.to+this.id,
            from: this.MENOR.id,
            to: hijo.to+this.id,
            label: String(acumulado),
            arrows: hijo.arrows,
            LETRA: hijo.LETRA,
            LETRA2: hijo.LETRA2,
            color: 'blue'
          }
          this.nodes2.add(newNodo);
          this.edges2.add(newEdge);
        });
        let men = -1;
        lista = [];
        this.DIRECCION.forEach(dir=>{
          if (men>dir.valor) {
            lista = []
          }
          if (men==-1 || dir.valor<=men && this.Visitados.get(dir.letra)==null) {

            if (dir.valor == men && dir.letra==this.MENOR.letra && dir.nivel > this.MENOR.nivel) {
            }
            else{
              lista.push(dir.letra);
              lista.sort();
              if (lista[0] == dir.letra) {
                men = dir.valor;
                this.MENOR = dir;
              }
            }
          }
        });
        this.inc();
      }
    }
  }

}

inc() {
	return this.id++
}


/*VARIABLES ***********************/
}
