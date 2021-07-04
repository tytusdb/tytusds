import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var w="", w1 = [];
var k, k1 = [];
var x1 = 0, y1 = 35;
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

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }

  pruebas(Texto: any){
    let Lzw = new AlgoritmoLZW(Texto);
    Lzw.Encode();
    console.log(Lzw.Salida);
    console.log(Lzw.diccionario);
    k1.push('')
    nodes.add(
      {id: 'dic', label:'Diccionario',x: 0 , y: 0, color: "#7BE141", shape: "box"}
    );
    nodes.add(
      {id: 'w', label:'w',x: 85 , y: 0, color: "#7BE141", shape: "box"}
    );
    nodes.add(
      {id: 'k', label:'k',x: 170 , y: 0, color: "#7BE141", shape: "box"}
    );
    nodes.add(
      {id: 'salida', label:'Salida',x: 255 , y: 0, color: "#7BE141", shape: "box"}
    );
    for(var i = 0; i <Lzw.diccionario.length; i++){
      nodes.add(
        {id: 'Dic'+i, label:Lzw.diccionario[i],x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      y1 = y1 + 35
    }
    x1 = x1 + 85;
    y1=35
    for(var i = 0; i <w1.length; i++){
      nodes.add(
        {id: 'w'+i, label:w1[i],x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      y1 = y1 + 35
    }
    x1 = x1 + 85;
    y1=35
    for(var i = 0; i <k1.length; i++){
      nodes.add(
        {id: 'k'+i, label:k1[i],x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      y1 = y1 + 35
    }
    x1 = x1 + 85;
    y1=35
    for(var i = 0; i <Lzw.Salida.length; i++){
      nodes.add(
        {id: 'C'+i, label:String(Lzw.Salida[i]),x: x1 , y: y1, color: "rgba(97,195,238,0.5)", shape: "box"}
      );
      y1 = y1 + 35
    }
    console.log(k1)
    console.log(w1)
  }

}



/*
  LZW = {
    compress: function (uncompressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = {},
            c,
            wc,
            w = "",
            result = [],
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[String.fromCharCode(i)] = i;
        }

        for (i = 0; i < uncompressed.length; i += 1) {
            c = uncompressed.charAt(i);
            wc = w + c;
            //Do not use dictionary[wc] because javascript arrays
            //will return values for array['pop'], array['push'] etc
           // if (dictionary[wc]) {
            if (dictionary.hasOwnProperty(wc)) {
                w = wc;
            } else {
                result.push(dictionary[w]);
                // Add wc to the dictionary.
                dictionary[wc] = dictSize++;
                w = String(c);
            }
        }

        // Output the code for w.
        if (w !== "") {
            result.push(dictionary[w]);
        }
        return result;
    },


    decompress: function (compressed) {
        "use strict";
        // Build the dictionary.
        var i,
            dictionary = [],
            w,
            result,
            k,
            entry = "",
            dictSize = 256;
        for (i = 0; i < 256; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }

        w = String.fromCharCode(compressed[0]);
        result = w;
        for (i = 1; i < compressed.length; i += 1) {
            k = compressed[i];
            if (dictionary[k]) {
                entry = dictionary[k];
            } else {
                if (k === dictSize) {
                    entry = w + w.charAt(0);
                } else {
                    return null;
                }
            }

            result += entry;

            // Add w+entry[0] to the dictionary.
            dictionary[dictSize++] = w + entry.charAt(0);

            w = entry;
        }
        return result;
    }
  }*/
