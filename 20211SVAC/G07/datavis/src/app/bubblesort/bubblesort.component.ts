import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as vis from 'vis';

var items = new vis.DataSet([]);


@Component({
  selector: 'app-bubblesort',
  templateUrl: './bubblesort.component.html',
  styleUrls: ['./bubblesort.component.css']
})
export class BubblesortComponent implements OnInit {

  constructor() { }

  


  public network: any;
  ngOnInit(): void {
  }

  

  ngAfterViewInit(){

   
    var options = {
      //style: "bar",
      drawPoints: false,
      dataAxis: {
        icons: true,
      },
      orientation: "top",
      start: "2014-06-10",
      end: "2014-06-18",
    };

    var container = document.getElementById('mychart');
    var graph2d = new vis.Graph2d(container, items,options);

    
  }
  data = []
  i=0;
  AddData(value: any){

    this.data.push(value);
    items.add({
      x:this.i, y:+value
    });
    this.i++;

  }
  burbuja(arreglo){
    let aux;
    for(let i=0;i<(arreglo.length-1);i++)
        for(let j=0;j<(arreglo.length-i);j++){
            if(arreglo[j]>arreglo[j+1]){
             aux=arreglo[j];
             arreglo[j]=arreglo[j+1];
             arreglo[j+1]=aux;
        }
    }
    return arreglo
}

}
