import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { Label } from 'ng2-charts';
import { Burbuja } from 'src/app/helpers/Burbuja/Burbuja';

@Component({
  selector: 'app-burbuja',
  templateUrl: './burbuja.component.html',
  styleUrls: ['./burbuja.component.css']
})

export class BurbujaComponent implements OnInit {
  fileName = '';
  burbuja:Burbuja
  datos:any []
  numero:boolean;
  letra:boolean;
  ordenamientoburbuja:[]

  
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
    this.burbuja = new Burbuja()
  }

  async mostrarBarras(){
    this.ordenamiento_burbuja(this.datos);
    let contador=0;
    if(contador!==500){
      setTimeout(() => {
      this.mostrarBarras();
      contador++;
      }, 1000);
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
        //await this.addData(data[i])
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
    link.download = "OrdenamientoBurbuja.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  
  }

  generarJSON1() {
    
    let data = {
        categoria: "Estructura Lineal",
        nombre: "ordenamiento",
        valores: []
    }
    
    for (let index = 0; index < this.ordenamientoburbuja.length; index++) {
        data.valores.push(this.ordenamientoburbuja[index])
        
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
  ordenamiento_burbuja(arregloBurbuja) {
   let delay=false;
    for (var i =0; i<(arregloBurbuja.length - 1); i++) {
      if(delay){i=i-1;break;}
        for (var j = 0; j < (arregloBurbuja.length - i); j++) {
        
            if(arregloBurbuja[j]> arregloBurbuja[j+1]){
            
              
                var aux = arregloBurbuja[j];
                arregloBurbuja[j] = arregloBurbuja[j+1]
                arregloBurbuja[j+1] = aux;
                delay=true;
                setTimeout(() => {
                  this.graficar(arregloBurbuja)
                  delay=false;
                }, 100);
                 
            }
        }
    }
    this.ordenamientoburbuja=arregloBurbuja;

}





}