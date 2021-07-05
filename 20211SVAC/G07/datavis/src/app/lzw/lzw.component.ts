import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var w="", w1 = [];
var k, k1 = [];
var x1 = 0, y1 = 35;
var tiempo;
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };
class AlgoritmoLZW{
  toConvert: any
  diccionario: any[]
  Salida: any[]
  constructor(texto: any) {
    this.toConvert = texto;
    this.diccionario = new Array();
    this.Salida = new Array()
  }
  Encode(){
    this.Salida = new Array();
    this.diccionario = new Array();
    w1.push('')
    let existe: boolean;
    for(let i in this.toConvert){
      existe=this.Buscar(this.toConvert[i])
      if(existe==false){
        this.diccionario.push(this.toConvert[i])
      }
    }
    for(let i in this.toConvert){
      k=this.toConvert[i];
      k1.push(k)
      if(this.Buscar(w+k)==true){
          w=w+k;
          w1.push(w)
      }else{
        this.diccionario.push(w+k)
        this.Salida.push(this.diccionario.indexOf(w))
        w=k;
        w1.push(w)
      }
    }
    this.Salida.push(this.diccionario.indexOf(w))
  }
  Buscar(valor: any){
    let existe=false
    for(let i=0;i<this.diccionario.length;i++){
      if(valor==this.diccionario[i]){
        existe=true;
        break;
      }
    }
    return existe;
  }
}


@Component({
  selector: 'app-lzw',
  templateUrl: './lzw.component.html',
  styleUrls: ['./lzw.component.css']
})
export class LZWComponent implements OnInit {
  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }
  texto:string;
  resultadoCifrado:string;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }
  definirTiempo(time:any){
    tiempo = 0;
    tiempo = time*10;
  } 

  abrir(eve:any)
  {
    let a =eve.target.files[0]


    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        this.texto=String(resultado)
        console.log(this.texto)
      }
      reader.readAsText(a)
    }


  }

  descargarContenido(){
    let downloadfile = "data: text/json;charset=utf-8,"+encodeURIComponent(this.resultadoCifrado);
    console.log(downloadfile);
    var downloader = document.createElement('a');
    downloader.setAttribute('href', downloadfile);
    downloader.setAttribute('download', 'data.txt');
    downloader.click();
  }

  enviarResultado(arreglo:any){
    this.resultadoCifrado = "";
    for (let i = 0; i < arreglo.length; i++) {
     this.resultadoCifrado += arreglo[i];
    }
  }
  delay(ms:number) {
    return new Promise( resolve => setTimeout(resolve,ms));
  }
  async pruebas(Texto: any){
    let Lzw = new AlgoritmoLZW(Texto);
    Lzw.Encode();
    console.log(Lzw.Salida);
    console.log(Lzw.diccionario);
    this.enviarResultado(Lzw.Salida);
    k1.push('')
    nodes.add(
      {id: 'dic', label:'Diccionario',x: 0 , y: 0, color: "#7BE141", shape: "box"}
    );
    await this.delay(tiempo)
    nodes.add(
      {id: 'w', label:'w',x: 85 , y: 0, color: "#7BE141", shape: "box"}
    );
    await this.delay(tiempo)
    nodes.add(
      {id: 'k', label:'k',x: 170 , y: 0, color: "#7BE141", shape: "box"}
    );
    await this.delay(tiempo)
    nodes.add(
      {id: 'salida', label:'Salida',x: 255 , y: 0, color: "#7BE141", shape: "box"}
    );
    await this.delay(tiempo)
    for(var i = 0; i <Lzw.diccionario.length; i++){
      nodes.add(
        {id: 'Dic'+i, label:Lzw.diccionario[i],x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      await this.delay(tiempo)
      y1 = y1 + 35
    }
    x1 = x1 + 85;
    y1=35
    for(var i = 0; i <w1.length; i++){
      nodes.add(
        {id: 'w'+i, label:w1[i],x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      await this.delay(tiempo)
      y1 = y1 + 35
    }
    x1 = x1 + 85;
    y1=35
    for(var i = 0; i <k1.length; i++){
      nodes.add(
        {id: 'k'+i, label:k1[i],x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      await this.delay(tiempo)
      y1 = y1 + 35
    }
    x1 = x1 + 85;
    y1=35
    for(var i = 0; i <Lzw.Salida.length; i++){
      nodes.add(
        {id: 'C'+i, label:String(Lzw.Salida[i]),x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      await this.delay(tiempo)
      y1 = y1 + 35
    }
    console.log(k1)
    console.log(w1)
  }

}


