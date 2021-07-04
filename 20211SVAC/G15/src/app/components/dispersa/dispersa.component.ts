import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Dispersa, Tipo } from 'src/app/helpers/Dispersa/Dispersa';
import { Network, DataSet } from 'vis';
import Swal from 'sweetalert2'
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

  numeroBuscar: number | string = ''
  numeroViejo: number | string = ''
  numeroNuevo: number | string = ''

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
    this.agregar(this.posX, this.posY, this.value)
    this.posY = ''
    this.posX = ''
    this.value = ''


  }

  agregar(x, y, value) {
    this.dispersa.add(x, y, value)
    let data = this.dispersa.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add([{ id: 0, label: '*', group: 'horizontal', level: 0 },])
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)
  }


  search() {
    let result: any = this.dispersa.buscarValor(this.numeroBuscar)
    if (result !== null) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se encontro el valor ${this.numeroBuscar} en la posicion: x: ${result.pos.x} y: ${result.pos.y} `
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No se encontro el valor ${this.numeroBuscar}  `
      })
    }

    this.numeroBuscar = ''
  }

  update() {

    let result: any = this.dispersa.buscarValor(this.numeroViejo)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No se encontro el valor ${this.numeroBuscar}  `
      })
      return
    }

    result.setValue(this.numeroNuevo)
    Swal.fire({
      icon: 'success',
      title: ':)',
      text: `Se edito en la posicion: x: ${result.pos.x} y: ${result.pos.y} `
    })

    let data = this.dispersa.graficar()
    this.nodes.clear()
    this.edges.clear()
    this.nodes.add([{ id: 0, label: '*', group: 'horizontal', level: 0 },])
    this.nodes.add(data.nodes)
    this.edges.add(data.edges)

    this.numeroNuevo = ''
    this.numeroViejo = ''
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      let duracion = +data.animacion

      data = data.valores
      for (let i = 0; i < data.length; i++) {
        let valor = data[i]
        this.agregar(+valor.indices[0], +valor.indices[1], valor.valor)
        await this.sleep(duracion * 1000)
      }


      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Recorrido Completo `
      })


    }
  }

  async processFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
      reader.onerror = reject;

      reader.readAsText(file);
    })
  }


  
  generarJSON() {
    let duracion = 3
    let jsonData = this.dispersa.getJSON(duracion)
    var link = document.createElement("a");
    link.download = "data.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(jsonData);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
