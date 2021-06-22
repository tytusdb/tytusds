import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { seleccion } from 'src/app/helpers/seleccion/seleccion';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  fileName = '';
  seleccion:seleccion
  datos: []
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
  
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData:ChartDataSets[]= [
    { data: [], label: 'Ordenamiento Seleccion'}
  ];
  constructor() { }

  ngOnInit(): void {
    this.seleccion = new seleccion()
  }
  async mostrarBarras(){
    //console.log(this.datos)
      if (this.numero===true) {
        this.barChartLabels = this.datos;
        this.barChartData[0].data=this.datos
      }else{
        this.barChartLabels = this.datos;
        let datoletra = []
        let y=1;
        for (let index = 0; index < this.datos.length; index++) {
          datoletra.push(y);
          y++;
          
        }
        this.barChartData[0].data=datoletra
      }
     
    
  }

  async onFileSelected(event) {
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
     // console.log(datos2)
      this.seleccion.ordenamientoSeleccion(datos2);
      this.datos=this.seleccion.ordenamientoSeleccion(datos2);
      console.log(this.datos)
      //this.mostrarBarras(this.datos)
      if (this.numero===true) {
        this.barChartLabels = data;
        this.barChartData[0].data=data
      }else{
        this.barChartLabels = data;
        let datoletra = []
        let y=5;
        for (let index = 0; index < data.length; index++) {
          if (data[index]>data[index+1]) {
             y=Math.round(Math.random() * 100),60;
             datoletra.push(y);
            
          }
          else if(data[index]<data[index+1])
          {
            
            
            y=Math.round(Math.random() * 100),50;
            
            datoletra.push(y);
            
          }
         // y=Math.round(Math.random() * 100)
          
         
          
        }
        this.barChartData[0].data = datoletra;
      }
      
     // this.barChartData.labels =data
      

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
    let data = this.seleccion.generarJSON()
    var link = document.createElement("a");
    link.download = "OrdenamientoSeleccion.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  
  }
}
