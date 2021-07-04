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
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {
  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }
  contenido = "{ \"valores\": [\n";


  generador(){
    for(var j =0;j<this.array.length;j++){
      if(j+1!=this.array.length){
        this.contenido += this.array[j]+",\n";
      }else{
        this.contenido += this.array[j]+"\n";
      }

    }
    this.contenido += "]}";
    //this.array.forEach(valor => this.contenido += valor +",\n");
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
  array = [];
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
        console.log("Resultado")
        console.log(resultado)
        var data = JSON.parse(text);  // se parse para obtener solo los datos
        data.valores.forEach(element => { // se pasa a un arreglo
          this.array.push(element)
        });
        //this.array.forEach(el => console.log(el))
        this.selectionSort(this.array); //metood de ordenamiento
        //console.log("Ordenado \n")
        //this.array.forEach(el => console.log(el))
        for (var k=0; k<this.array.length; k++){
          let valors = this.array[k]
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

  swap(myArr, indexOne, indexTwo){
    if( indexOne == indexTwo ){
      return myArr;
    }
    var tmpVal = myArr[indexOne];
    myArr[indexOne] = myArr[indexTwo];
    myArr[indexTwo] = tmpVal;
    return myArr;
  }

  selectionSort( myArr ){
    var size = myArr.length;
    for( var slot = 0; slot < size -1; slot ++ ){ // outer loop
      var smallest = slot;
      for( var check = slot + 1; check < size; check++ ){ // inner loop
        if( myArr[check] < myArr[smallest] ){
          smallest = check;
        }
      }
      this.swap( myArr, smallest, slot );
    }
    return myArr;
  }

}
