import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {rapido} from 'src/app/helpers/rapido/rapido'

@Component({
  selector: 'app-metodorapido',
  templateUrl: './metodorapido.component.html',
  styleUrls: ['./metodorapido.component.css']
})
export class MetodorapidoComponent implements OnInit {

  fileName = '';
  rapido:rapido
  datos = []
  numero:boolean;
  letra:boolean;

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
  private datos2 = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData:ChartDataSets[]= [
    { data: [], label: 'Ordenamiento Seleccion'}
  ];
  constructor() { }

  ngOnInit(): void {
    this.rapido = new rapido()
  }
  async mostrarBarras(){
    // this.burbuja.bubbleSort();
     this.quickSort(this.datos2,0,this.datos2.length-1);
     
   }
 
   async onFileSelected(event) {
     this.datos2=[];
     
     const file = event.target.files[0];
     if (file) {
 
       this.fileName = file.name;
       let data:any = await this.processFile(file)
       data = JSON.parse(data)
       data = data.valores
      
      for(let i = 0; i < data.length; i++){
        //await this.addData(data[i])
        this.datos2.push(data[i])
        if (!isNaN(data[i])) {
          this.letra=false;
          this.numero=true;
        }else{
          this.numero=false;
          this.letra=true;
        }
       
      }
       this.graficar(data);

       
 
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
   graficar(data:any){
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
 
   generarJSON(){
     let data = this.generarJSON1(this.datos2)
     var link = document.createElement("a");
     link.download = "OrdenamientoRapido.json";
     var info = "text/json;charset=utf-8," + encodeURIComponent(data);
     link.href = "data:" + info;
     link.click();
     link.remove()
   

   }
   generarJSON1(array) {
    let data = {
        categoria: "Estructura Lineal",
        nombre: "Ordenamiento",
        valores: array
    }
    return JSON.stringify(data)
   }
   partition(items, low, high) {
    var pivot = items[high]
        let i = (low - 1);
        for (let j = low; j <= high-1; j++)
        {
            if (items[j] < pivot)
            {
                i++;   
                let temp = items[i]; 
                items[i] = items[j]; 
                items[j] = temp;
          
            }
        }
    let temp = items[i+1]; 
    items[i+1] = items[high]; 
    items[high] = temp; 
    return i+1;
}

quickSort(items, left, right) {
  setTimeout(() => { 
    this.graficar(this.datos2)
    var index;
    if(left < right){
        let pi =this.partition(items, left, right);
        this.quickSort(items, left, pi-1); 
        this.quickSort(items, pi+1, right); 
    } 
  }, 1000);
 

}

}