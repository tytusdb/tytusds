import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Compuestas, Estructura } from 'src/app/helpers/Compuestas/Compuestas';
import { Network, DataSet } from 'vis';
@Component({
  selector: 'app-compuesta',
  templateUrl: './compuesta.component.html',
  styleUrls: ['./compuesta.component.css']
})
export class CompuestaComponent implements OnInit {

  index: number | string = ''
  value: number | string = ''
  estructuraPadre: number = 0
  fileName

  estructuraCompuesta: Compuestas
  flagExsite: boolean = false


  options = {
    groups: {
      horizontal: {
        shape: 'square',
        borderWidth: 3,

      },
      vertical: {
        shape: 'square',
        borderWidth: 3,

      }
    },
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" }
      }
    },
    layout: {
      hierarchical: {
        direction: "UD", // From up to bottom.
      },
    },
  }

  nodes: DataSet<any>
  edges: DataSet<any>
  network: any


  @ViewChild('matriz', { static: false }) el: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.nodes = new DataSet<any>()
    this.edges = new DataSet<any>()

    let container = this.el.nativeElement

    let data = { nodes: this.nodes, edges: this.edges };

    this.network = new Network(container, data, this.options);

  }


  async add() {
    if (!this.flagExsite) {
      this.estructuraCompuesta = new Compuestas(this.getEstructuraPadre(), Estructura.SIMPLE_ENLAZADA)
      this.flagExsite = true
    }
    await this.estructuraCompuesta.add(this.index,this.value)

    let data: any = await this.estructuraCompuesta.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)


    this.index = ''
    this.value = ''
  }


  getEstructuraPadre() {
    if (this.estructuraPadre === 0) return Estructura.SIMPLE_ENLAZADA
    else return Estructura.ABB
  }

}
