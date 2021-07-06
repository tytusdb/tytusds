import { ReadVarExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild, ɵsetCurrentInjector } from '@angular/core';
import * as vis from 'vis';

var tiempo;
var options = {
  
  physics: {
    enabled: true,
  },
};
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
let listaData = { nodes: nodes,
  edges: edges };


  // class arista {
  //   from: vertice;
  //   peso: number;
  //   to: vertice;
  //   constructor(from,peso,to) {
  //     this.from = from;
  //     this.peso = peso;
  //     this.to = to;
  //   }
  // }

  class vertice {
    id: number;
    valor: any;
    succesors: number[];
    aristas: number[];

    constructor(value, id) {
      this.valor=value;
      this.id = id;

      this.succesors = [];
      this.aristas = [];
    }

    
  }

  class grafo {
    vertix: vertice[];
    constructor() {
      this.vertix = [];
    }
  }
  var pagina = new grafo();


@Component({
  selector: 'app-rbanchura-grafos',
  templateUrl: './rbanchura-grafos.component.html',
  styleUrls: ['./rbanchura-grafos.component.css']
})





export class RBAnchuraGrafosComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network:any;
  array = [];
  contenido = "{ \"valores\": [\n";
  

  constructor() { }

  
  

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }

  ValorPos(valor: any){
    let dato = 0
    if(typeof valor == 'string'){
        for(let j = 0; j < valor.length; j++){
            dato += valor.charCodeAt(j)
        }
    } else {
        dato = valor
  return dato
    }
    return dato
}

  addVertice(data){
    nodes.add(
      {id: this.ValorPos(data), label: data}
    );
    pagina.vertix.push(new vertice(data,this.ValorPos(data)));
  }

  addArista(veri,dist,verf){
    if(this.buscarPagina(veri)!=null && this.buscarPagina(verf)!=null){

      edges.update(
        {from: this.ValorPos(veri), to: this.ValorPos(verf) , length:20, label:dist}
      );
  
      var tmp = this.buscarPagina(veri);
      var tmp2 = this.buscarPagina(verf);

      tmp.aristas.push(dist);
      tmp.succesors.push(verf);

      // tmp2.aristas.push(dist);
      // tmp2.succesors.push(verf);
    }
  }

  deleteVertice(data){
    nodes.remove(this.ValorPos(data));
    pagina.vertix.splice(this.getindexPagina(data),1)
  }
  actualizarVertice(viejo, nuevo){
    var tmp = this.buscarPagina(viejo);
    nodes.update({
      id: tmp.id, label: nuevo
    });
    tmp.valor = nuevo;
  }
  buscarVertice(data){
    var tmp = this.buscarPagina(data);
    nodes.update(
      {id: tmp.id, color: "green"}
    );
  }

  async searchAnchura(data,buscado){


    var list = [data];
    
    while (list.length> 0){

      var current = list.shift();
      var aver = this.buscarPagina(current);
      if(current == buscado){

        nodes.update(
          {id: aver.id, color: "green"}
        );
        return;
      }
      nodes.update(
        {id: aver.id, color: "red"}
      );
      list = list.concat(this.buscarPagina(current).succesors);
      await this.delay(1000);
    }

    console.log("Elemento no encontrado...");
    
  }

  
  
  async searchProfundidad(data, buscado){
    var list = [data];
    var aver = this.buscarPagina(current);
    while (list.length > 0){
      var current = list.shift();
      if(current == buscado){
        nodes.update(
          {id: aver.id, color: "green"}
        );
        return;
      }
      nodes.update(
        {id: aver.id, color: "red"}
      );
      var temp = this.buscarPagina(current).succesors;
      temp.reverse();
      list = temp.concat(list);
      await this.delay(1000);

    }



  }

  delay(ms:number) {
    return new Promise( resolve => setTimeout(resolve,ms));
  }
  descargar(){}

  buscarPagina(data){
    for(var i = 0;i<pagina.vertix.length;i++){
      if(pagina.vertix[i].valor==data){
        return pagina.vertix[i];
      }
    }
  }
  getindexPagina(data){
    for(var i = 0;i<pagina.vertix.length;i++){
      if(pagina.vertix[i].valor==data){
        return i;
      }
    }
  }
  
  async abrir(eve:any)
  {
    let a = eve.target.files[0];
    let text = "";
    if(a){
      let reader = new FileReader();
      reader.onload = async  ev =>{

        const resultado = ev.target?.result;
        text = String(resultado);

        var data = JSON.parse(text);
        tiempo = data.animacion;
        console.log("Time: "+tiempo);
        data.valores.forEach(element=>{
          this.addVertice(String(element.vertice));
          
        });

        data.valores.forEach(element=>{
          element.aristas.forEach(linea =>{
            this.addArista(String(element.vertice),String(linea.distancia),String(linea.arista))
          });
        });

      }
      reader.readAsText(a);
    }
  }
  generador(){
    for(var i = 0; i<pagina.vertix.length;i++){
      
        if(i+1!=pagina.vertix.length){

          this.contenido += "{\"vertice\":"+pagina.vertix[i].valor+",\n";
          this.contenido += "\"aristas\": [";
          for(var j = 0; j<pagina.vertix[i].aristas.length;j++){
            if(j+1!=pagina.vertix[i].aristas.length){
              this.contenido += "{\"arista\": "+ pagina.vertix[i].succesors[j]+", \n";
              this.contenido += "\"distancia\":"+ pagina.vertix[i].aristas[j]+"},";
            }else{
              this.contenido += "{\"arista\": "+ pagina.vertix[i].succesors[j]+", \n";
              this.contenido += "\"distancia\":"+ pagina.vertix[i].aristas[j]+"}";
            }
          }
          this.contenido += "]},"
        }else{
          this.contenido += "{\"vertice\":"+pagina.vertix[i].valor+",\n";
          this.contenido += "\"aristas\": [";
          for(var j = 0; j<pagina.vertix[i].aristas.length;j++){
            if(j+1!=pagina.vertix[i].aristas.length){
              this.contenido += "{\"arista\": "+ pagina.vertix[i].succesors[j]+", \n";
              this.contenido += "\"distancia\":"+ pagina.vertix[i].aristas[j]+"},";
            }else{
              this.contenido += "{\"arista\": "+ pagina.vertix[i].succesors[j]+", \n";
              this.contenido += "\"distancia\":"+ pagina.vertix[i].aristas[j]+"}";
            }
          }
          this.contenido += "]}"
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

  async costo(start, end){
    
   
    
    var list = [start];
    
    
    while(list.length>0){
      
      

      var current = list.shift();

      if(current == end){
        nodes.update({
          id: this.buscarPagina(current).id, color: "green"
        });
        return;
      }
      nodes.update({
        id: this.buscarPagina(current).id, color: "red"
      });
      await this.delay(1000);

      var temp = this.buscarPagina(current).succesors;
      list = temp.concat(list);
      list = list.sort((a,b)=>{return a[1]-b[1]});
    }
  }
  
  id = 1;
  inc(){
    return this.id++;
  }
}
