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
  mostrarBarras(){
    
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
      console.log(datos2)
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
  
  }


}
