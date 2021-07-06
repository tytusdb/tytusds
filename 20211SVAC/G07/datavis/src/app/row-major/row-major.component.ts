import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var tiempo;
var n: number; // columnas
var m: number; // filas
var matriz: any[][];//matriz
var linealizado: any[];//matriz de 2d linealizada
var taman: number; //tamaño del arreglo
var fr: number, cr: number, ante: string
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };

@Component({
  selector: 'app-row-major',
  templateUrl: './row-major.component.html',
  styleUrls: ['./row-major.component.css']
})
export class RowMajorComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;

  constructor() { }
  contenido = "";
  delay(ms:number) {
    return new Promise( resolve => setTimeout(resolve,ms));
  }
  x1 = 0;
  y1 = 0;
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
  generador(){
    this.contenido = "";
    this.contenido = "{ \"valores\": [\n";
    for (let i = 0; i < linealizado.length; i++) {
     this.contenido += '"'+linealizado[i]+'"'+",\n";
    }
    this.contenido += "\n ]\n}"
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

  code = '';
  texto="";
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
        tiempo = data.animacion*10;
        console.log("Time: "+tiempo);
        this.TamanoMatriz(data.m[0],data.m[1]);
        data.valores.forEach(element => { // se pasa a un arreglo
          console.log(element.indices[0])
          console.log(element.indices[1])
          console.log(element.valor)
          this.AgregarNuevo(element.valor,element.indices[0],element.indices[1]);

        });

        this.code=text.toString();
      }
      reader.readAsText(a)
    }
  }
  async AgregarNuevo(valor: any, fila: number, columna: number){
    fr = fila
    cr = columna
    matriz[fr][cr] = valor
    nodes.update(
      {id: fr+','+cr, label:String(valor)}
    );
    await this.delay(tiempo)
  }
  async TamanoMatriz(dato1: number, dato2: number){
    m = dato1 //filas
    n = dato2//columnas
    //se crea un arreglo del Tamaño de matriz m
    matriz = new Array(m);
    //en cada fila se crean las columnas, un arreglo de tamaño n
    for(var i=0; i<m; i++) {
      //Bucle que recorre el array que está en la posición i
      matriz[i] = new Array(n)
      for(var j=0; j<n; j++) {
          matriz[i][j] = 0; // se agregan 0 en todas las posiciones
          nodes.add(
            {id: i+','+j, label:'0',x: this.x1 , y: this.y1, color: "rgba(97,195,238,0.5)",shape: "box"}
          );
          this.x1 = this.x1 + 70
          await this.delay(tiempo)
      }
      this.x1 = 0
      this.y1 = this.y1 + 35
      await this.delay(tiempo)
  }
    console.log('LLENO');
    console.log(matriz);// muestra de la matriz
    var id = nodes.get({
      fields:['id', 'label']
    });
    console.log(id);
  }
  async Linealizar(){
    taman = m*n;
    this.y1 = this.y1 + 50
    this.x1 = -40
    linealizado = new Array(taman);
    for (let j = 0; j < taman; j++) {
      linealizado[j] = '0';
      nodes.update(
        {id: j, label:'0',x: this.x1 , y: this.y1, color: "#7BE141", shape: "box"}
      );
      this.x1 = this.x1 + 70
      await this.delay(tiempo)
    }
    console.log(linealizado);
    for (let i = 0; i < m; i++) {
		  for (let j = 0; j < n; j++) {
        console.log(i*n+j)
        console.log(matriz[i][j])
        let pos = i*n+j
        linealizado[pos] = matriz[i][j];
        nodes.update(
          {id: pos, label:String(matriz[i][j])}
        );
        await this.delay(tiempo)
		  }
      await this.delay(tiempo)
	  }
    console.log(linealizado);
  }
  async SearchData(chale: any){
    let temp1 = linealizado.indexOf(chale)
    var id = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(id)
    for (var val of id){
      if(val.color === '#5A1E5C'){
        nodes.update(
          {id: val.id, color: "#7BE141"}
        );
        await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }
    for (var val of id){
      if(val.id === String(temp1)){
        nodes.update(
          {id: val.id, color: "#5A1E5C"}
        );
        await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }
    for(var i=0; i<m; i++) {
      for(var j=0; j<n; j++) {
          if(matriz[i][j] == chale){
            for (var val of id){
              if(val.label === String(matriz[i][j])){
                nodes.update(
                  {id: val.id, color: "#5A1E5C"}
                );
                await this.delay(tiempo)
              }
              await this.delay(tiempo)
            }
            await this.delay(tiempo)
          }
          await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }

  }
  async UpdateData(valor: any, valor1: any){
    let temp1 = linealizado.indexOf(valor)

    var id = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(id)
    for (var val of id){
      if(val.color === '#5A1E5C'){
        nodes.update(
          {id: val.id, label: String(valor1), color: "#7BE141"}
        );
        await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }
    nodes.update(
      {id: temp1, label: String(valor1), color: "#5A1E5C"}
    );
    linealizado[temp1] = valor1;
    for(var i=0; i<m; i++) {
      for(var j=0; j<n; j++) {
          if(matriz[i][j] == valor){
                nodes.update(
                  {id: i+','+j, label: String(valor1), color: "#5A1E5C"}
                );
                matriz[i][j] = valor1
          }
          await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }
    console.log(valor, valor1)
  }
 async DeleteData(valor: any){
    let temp1 = linealizado.indexOf(valor)
    linealizado[temp1] = 0;
    var id = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(id)
    for (var val of id){
      if(val.color === '#5A1E5C'){
        nodes.update(
          {id: val.id ,color: "#7BE141"}
        );
        await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }
    nodes.update(
      {id: temp1, label: '0', color: "#5A1E5C"}
    );
    for(var i=0; i<m; i++) {
      for(var j=0; j<n; j++) {
          if(matriz[i][j] == valor){
            nodes.update(
              {id: i+','+j, label: '0', color: "#5A1E5C"}
            );
            matriz[i][j] = 0
            await this.delay(tiempo)
          }
          await this.delay(tiempo)
      }
      await this.delay(tiempo)
    }
    await this.delay(tiempo)
  }

}
