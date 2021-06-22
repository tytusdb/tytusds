import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { seleccion } from 'src/app/helpers/seleccion/seleccion';

@Component({
  selector: 'app-metodo-seleccion',
  templateUrl: './metodo-seleccion.component.html',
  styleUrls: ['./metodo-seleccion.component.css']
})
export class MetodoSeleccionComponent implements OnInit {
    fileName = '';
    ordenamiento: seleccion
    datos:any []
    numero:boolean;
    letra:boolean;
    private selectionSort: any
    ordenamientoS: []

    
    public barChartOptions: ChartOptions = {
      responsive: true,
      tooltips: {enabled: false},
      hover: {mode: null},
      
      scales: { xAxes: [{
        gridLines:{
          display: false
        },
      }],
      yAxes: [{
        gridLines:{
          display: false
        },
        ticks: {
          display: false
      }
      }]},
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
    //public barChartPlugins = [pluginDataLabels];

    public barChartData:ChartDataSets[]= [
      { data: [], label: 'METODO BURBUJA'}
    ];
    @ViewChild('myChart') cuerpoDraw: ElementRef;
    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        this.ordenamiento=new seleccion();
    }

    async mostrarBarras(){
      this.ordenamientoSeleccion(this.datos);
   
       let contador=0;
      if(contador!==500){
        setTimeout(() => {
        this.mostrarBarras();
        contador++;
        }, 500);
      }

    }

    async onFileSelected(event) {
      this.datos=[];
      const file = event.target.files[0];
      if (file) {

        this.fileName = file.name;
        let data:any = await this.processFile(file)
        data = JSON.parse(data)
        data = data.valores
        let datos2 = [];
        for(let i = 0; i < data.length; i++){
        
          datos2.push(data[i])
          if (!isNaN(data[i])) {
            this.letra=false;
            this.numero=true;
          }else{
            this.numero=false;
            this.letra=true;
          }
        
        }
        this.graficar(data);
        this.datos=datos2;
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


    generarJSON(){
      let data = this.generarJSON1()
      var link = document.createElement("a");
      link.download = "OrdenamientoSeleccion.json";
      var info = "text/json;charset=utf-8," + encodeURIComponent(data);
      link.href = "data:" + info;
      link.click();
      link.remove()
    
    }
    generarJSON1() {

      let data = {
          categoria: "Estructura Lineal",
          nombre: "Ordenamiento ",
          valores: []
      }

      for (let index = 0; index < this.ordenamientoS.length; index++) {
          data.valores.push(this.ordenamientoS[index])

      }



      return JSON.stringify(data)
  }
    graficar(data){
      if (this.numero===true) {
        this.barChartLabels = data;
        this.barChartData[0].data=data
      }else{
        this.barChartLabels = data;
        let datoletra = []
        data.forEach(element => {
          datoletra.push(element.charCodeAt(0));
        });
        this.barChartData[0].data = datoletra;
      }
    }
    swap(selectionSort, indexOne, indexTwo) {
      if (indexOne == indexTwo) {
          return selectionSort
      }
      var tmpVal = selectionSort[indexOne]
      selectionSort[indexOne] = selectionSort[indexTwo]
      selectionSort[indexTwo] = tmpVal
      return selectionSort
  }

  ordenamientoSeleccion(selectionSort) {
    let delay=false;
      var size = selectionSort.length
      for (var slot = 0; slot < size - 1; slot++) {
        if(delay){slot=slot-1;break;}
          var smallest = slot;
          for (var check = slot + 1; check < size; check++) {
              if (selectionSort[check] < selectionSort[smallest]) {
                  smallest = check
                  delay=true;
                  setTimeout(() => {
                    this.graficar(selectionSort)
                    delay=false;
                  }, 100);
              }

          }
          this.swap(selectionSort, smallest, slot)
      }
      this.ordenamientoS=selectionSort;
   
  }
}