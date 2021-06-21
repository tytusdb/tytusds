import { routerTransition } from '../../router.animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import BurbujaImpl from './impl-ordenamientos/burbuja';

@Component({
  selector: 'app-ordenamientos',
  templateUrl: './ordenamientos.component.html',
  styleUrls: ['./ordenamientos.component.css'],
  animations: [routerTransition()]
})
export class OrdenamientosComponent implements OnInit {
  paramsSubscription: Subscription;
  public idOrdenamiento=0;
  tituloOrdenamiento:string;
  strCarga:string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idOrdenamiento = +params['idOrdenamiento'];
      switch(this.idOrdenamiento){
        case 1:this.tituloOrdenamiento="Burbuja"; 
                break; 
      }
    });
    
  }
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels: string[] = ['1',
  '2',
  '3',
  '4',
  '5'];
  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
      { data: [85,
        25,
        55,
        40,
        15], label: 'Datos leídos' }
  ];
  clickOrdenar(): void{
    //burbuja
    if(this.idOrdenamiento==1){
      console.log(this.barChartData[0].data);
      var a = this.barChartData[0].data;
      let b = new BurbujaImpl(a);
      let datosOrdenados = b.getDatosOrdenados();    
      let data = new Array(datosOrdenados.length);
      for(let i =0;i<datosOrdenados.length;i++){
        data[i]=datosOrdenados[i];
      }
      this.barChartData[0].data = data;
    } 
    //this.barChartData[0].data = data;
  }
  public randomize(): void {
    const data = [Math.round(Math.random() * 100), 59, 80, Math.random() * 100, 56, Math.random() * 100, 40];
    this.barChartData[0].data = data;
  } 
  clickCargar(){
    let strIntoObj = JSON.parse(this.strCarga);
    //console.log(strIntoObj);
    let labels:string[] = new Array(strIntoObj.valores.length);
    for(let i =0;i<strIntoObj.valores.length;i++){
      labels[i]=String(i+1);
    }
    this.barChartLabels=labels;    
    this.barChartData[0].data = strIntoObj.valores;
    console.log(this.barChartData[0].data);
  }
}
