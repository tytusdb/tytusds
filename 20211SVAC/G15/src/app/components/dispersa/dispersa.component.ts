import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Dispersa, Tipo } from 'src/app/helpers/Dispersa/Dispersa';
import { Network, DataSet } from 'vis';
@Component({
  selector: 'app-dispersa',
  templateUrl: './dispersa.component.html',
  styleUrls: ['./dispersa.component.css']
})
export class DispersaComponent implements OnInit {
  dispersa: Dispersa
  posX: number | string
  posY: number | string
  value: number | string
  fileName

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

  @ViewChild('matriz', { static: false }) el: ElementRef;

  nodes: DataSet<any>
  edges: DataSet<any>
  network: any


  constructor() {

    this.dispersa = new Dispersa(Tipo.DOBLE)


  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    this.nodes = new DataSet<any>()
    this.edges = new DataSet<any>()

    let container = this.el.nativeElement
    this.nodes = new DataSet<any>(
      [
        { id: 0, label: '*', group: 'horizontal' },
      ]
    )
    let data = { nodes: this.nodes, edges: this.edges };

    this.network = new Network(container, data, this.options);



  }

  add() {
    this.dispersa.add(this.posX, this.posY, this.value)
    this.posY = ''
    this.posX = ''
    this.value = ''

    let data = this.dispersa.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add([{ id: 0, label: '*', group: 'horizontal', level: 0 },])
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)
  }

}
