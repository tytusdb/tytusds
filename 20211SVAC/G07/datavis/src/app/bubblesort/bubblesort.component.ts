import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as vis from 'vis';

var datos = "";
var items = new vis.DataSet([]);


@Component({
  selector: 'app-bubblesort',
  templateUrl: './bubblesort.component.html',
  styleUrls: ['./bubblesort.component.css']
})
export class BubblesortComponent implements OnInit {

  constructor() { }
  contenido = "{ valores: \n";

  
  
  generador(){
    this.arr.forEach(valor => this.contenido += valor +",\n");
  }

  descargarContenido(){
    this.generador();
    this.contenido += "}";
    console.log(this.contenido)
  }

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
  

  code = '';
  arr = [];
  texto = "";
  abrir(eve:any)
  {
    let a =eve.target.files[0]
    let text=""
  
    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        var data = JSON.parse(text);  // se parse para obtener solo los datos
        data.valores.forEach(element => { // se pasa a un arreglo
          this.arr.push(element)
        });
        this.arr.forEach(el => console.log(el))
        this.burbuja(this.arr);
        console.log("Ordenado \n")
        this.arr.forEach(el => console.log(el))
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


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
