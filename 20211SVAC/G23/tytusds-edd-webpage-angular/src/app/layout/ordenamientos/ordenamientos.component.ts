import { routerTransition } from '../../router.animations';
import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import BurbujaImpl from './impl-ordenamientos/burbuja';
import { JsonNodoOrdenamiento } from './impl-ordenamientos/ordenamiento-json';

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
  strOrdenamientoJson: string
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idOrdenamiento = +params['idOrdenamiento'];
      switch(this.idOrdenamiento){
        case 1:this.tituloOrdenamiento="Burbuja"; 
          break; 
        case 2:this.tituloOrdenamiento="Seleccion"
        break;
        case 3:this.tituloOrdenamiento="Insercion"
        break;
        case 4:this.tituloOrdenamiento="Rapido"
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
      let jsonNodoArray= new JsonNodoOrdenamiento("Ordenamiento",this.tituloOrdenamiento,data);
      this.strOrdenamientoJson = JSON.stringify(jsonNodoArray);
    } 
    else if(this.idOrdenamiento==2){

    }else if(this.idOrdenamiento==3){

    }else{
      
    }
    //this.barChartData[0].data = data;
  }
  fileContent: string = '';
  public cargarArchivo(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result.toString();
    }
    fileReader.readAsText(file);
    this.strCarga=self.fileContent;
  }
  clickCargar(){
    this.strCarga=this.fileContent;
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
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }
  downloadJson() {
    this.fakeValidateUserData().subscribe((res: any) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: this.tituloOrdenamiento+'.json',
        text: res
      });
    });
  }
  fakeValidateUserData() {
    return of(this.strOrdenamientoJson);
  }
  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
    }) {
      if (!this.setting.element.dynamicDownload) {
        this.setting.element.dynamicDownload = document.createElement('a');
      }
      const element = this.setting.element.dynamicDownload;
      const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
      element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
      element.setAttribute('download', arg.fileName);
      var event = new MouseEvent("click");
      element.dispatchEvent(event);
    }
}
