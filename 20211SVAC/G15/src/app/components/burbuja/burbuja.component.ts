import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
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
  datos: []
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'METODO BURBUJA' }
  ];
  constructor() { }

  ngOnInit(): void {
    this.burbuja = new Burbuja()
  }
  async mostrarBarras(){
    //console.log(this.datos)
      this.barChartLabels = this.datos;
      this.barChartData[0].data=this.datos
    
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
       
      }
     // console.log(datos2)
      this.burbuja.ordenamiento_burbuja(datos2);
      this.datos=this.burbuja.ordenamiento_burbuja(datos2);
      console.log(this.datos)
      //this.mostrarBarras(this.datos)
      this.barChartLabels = data;
      this.barChartData[0].data=data
      

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
    let data = this.burbuja.generarJSON()
    var link = document.createElement("a");
    link.download = "data.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  
  }


}
