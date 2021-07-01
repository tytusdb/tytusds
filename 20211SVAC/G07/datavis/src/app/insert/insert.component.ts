import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import * as vis from 'vis';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  layout:{
    hierarchical:{
      enabled: true,
      direction: 'LR',
    },
  },
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };
var i = 0;
var l = 1;

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }
  contenido = "{ \"valores\": [\n";
  
  generador(){
    for(var j =0;j<this.arr.length;j++){
      if(j+1!=this.arr.length){
        this.contenido += this.arr[j]+",\n";
      }else{
        this.contenido += this.arr[j]+"\n";
      }
      
    }
    this.contenido += "]}";
  }

  descargarContenido(){
    this.generador();
    let downloadfile = "data: text/json;charset=utf-8,"+encodeURIComponent(this.contenido);
    console.log(downloadfile);
    var downloader = document.createElement('a');
    downloader.setAttribute('href', downloadfile);
    downloader.setAttribute('download', 'data.json');
    downloader.click();
  }

  ngOnInit(): void {
  }

  
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
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
        this.insertionSort(this.arr);
        console.log("Ordenado \n")
        this.arr.forEach(el => console.log(el))
        for (var k=0; k<this.arr.length; k++){
          let valors = this.arr[k]
          console.log(valors)
          nodes.add(
            {id: i, label:String(valors)}
          );
          edges.add(
            {from: i, to: l, length: 20, arrows: 'to'}
          );
          i++;
          l++
        }
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


  }

  insertionSort( myArr ) {
    var size = myArr.length,
        slot,
        tmp;

    for ( var item = 0; item < size; item++ ) { // outer loop
      tmp = myArr[item];
      for ( slot = item - 1; slot >= 0 && myArr[slot] > tmp; slot-- ){ // inner loop
        myArr[ slot + 1 ] = myArr[slot];
      }
      myArr[ slot + 1 ] = tmp;
    }
    return myArr;
}
}
