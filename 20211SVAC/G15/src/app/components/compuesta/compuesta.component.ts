import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Compuestas, Estructura } from 'src/app/helpers/Compuestas/Compuestas';
import { Network, DataSet } from 'vis';
import Swal from 'sweetalert2'
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

  indexBuscar: number | string = ''
  valueBuscar: number | string = ''

  indexEditar: number | string = ''
  valueNuevo: number | string = ''
  valueViejo: number | string = ''

  indexEliminar: number | string = ''
  valueEliminar: number | string = ''


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
    await this.estructuraCompuesta.add(this.index, this.value)

    let data: any = await this.estructuraCompuesta.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)


    this.index = ''
    this.value = ''
  }

  async search() {
    let result = await this.estructuraCompuesta.buscar(this.indexBuscar, this.valueBuscar)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No encontro el valor ${this.valueBuscar} en el index: ${this.indexBuscar}`
      })
      return
    }

    Swal.fire({
      icon: 'success',
      title: ':)',
      text: `Se encontro el valor ${this.valueBuscar} en el index: ${this.indexBuscar}`
    })
    this.indexBuscar = ''
    this.valueBuscar = ''
  }

  async edit() {
    let result = await this.estructuraCompuesta.editar(this.indexEditar, this.valueViejo, this.valueNuevo)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No se puedo editar el valor ${this.valueViejo} en el index: ${this.indexEditar}`
      })
      return
    }

    Swal.fire({
      icon: 'success',
      title: ':)',
      text: `Se puedo editar el valor ${this.valueViejo} en el index: ${this.indexEditar}`
    })

    let data: any = await this.estructuraCompuesta.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)


    this.indexEditar = ''
    this.valueNuevo = ''
    this.valueViejo = ''
  }


  async delete() {
    let result = await this.estructuraCompuesta.eliminar(this.indexEliminar, this.valueEliminar)

    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No encontro el valor ${this.valueEliminar} en el index: ${this.indexEliminar}`
      })
      return
    }

    Swal.fire({
      icon: 'success',
      title: ':)',
      text: `Se Elimino el valor ${this.valueEliminar} en el index: ${this.indexEliminar}`
    })
    let data: any = await this.estructuraCompuesta.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)


    this.indexEliminar = ''
    this.valueEliminar = ''
  }

  getEstructuraPadre() {
    if (this.estructuraPadre === 0) return Estructura.SIMPLE_ENLAZADA
    else return Estructura.ABB
  }

}
