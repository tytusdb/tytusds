import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Insertion } from '../../helpers/Insercion/Insercion'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-insertion-sort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.css']
})
export class InsertionSortComponent implements OnInit {

  fileName = '';
  arreglo: [] = []
  arregloOrdenado: any[] = []
  arregloletra: any[] = []
  duracion: number = 2
  insertion: Insertion


  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: { enabled: false },
    hover: { mode: null },

    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };


  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;


  public barChartData: ChartDataSets[] = [
    { data: [], label: 'METODO INSERCION' }
  ];

  constructor() {
    this.insertion = new Insertion()
  }

  ngOnInit(): void {
  }

  async mostrarGrafica(arreglo, arreglo2) {
    this.barChartLabels = arreglo
    this.barChartData[0].data = arreglo2
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      this.duracion = +data.animacion
      data = data.valores
      this.arreglo = data
      if (isNaN(this.arreglo[this.arreglo.length - 1])) {
        this.arregloletra = []
        for (let j = 1; j <= this.arreglo.length; j++) {
          let a = Math.round(Math.random() * 100)
          this.arregloletra.push(a)
        }
        this.mostrarGrafica(this.arreglo, this.arregloletra)
      }
      else  this.mostrarGrafica(this.arreglo, this.arreglo)
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

  async ordenar() {
    for (let i = 0; i < this.arreglo.length; i++) {
      this.arregloOrdenado = this.insertion.ordenar(this.arregloOrdenado, this.arreglo[i])
      if (isNaN(this.arreglo[i])) {
        this.arregloletra = []
        for (let j = 1; j <= this.arregloOrdenado.length; j++) {
          this.arregloletra.push(j)
          this.mostrarGrafica(this.arregloOrdenado, this.arregloletra)
        }
      }
      else this.mostrarGrafica(this.arregloOrdenado, this.arregloOrdenado)
      await this.sleep(this.duracion * 1000)
    }

    Swal.fire({
      target: document.getElementById('form-modal'),
      icon: 'success',
      title: ':)',
      text: `Arreglo ordenado con exito`
    })
  }

  generarJSON() {
    let data = {
      categoria: "Estructura Lineal",
      nombre: "Ordenamiento",
      repeticion: false,
      animacion: this.duracion,
      valores: (this.arregloOrdenado.length === 0) ? this.arreglo : this.arregloOrdenado
    }


    let jsonData = JSON.stringify(data)
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
