import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var h;
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var x1 = 0, y1 = 0;
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
  edges: edges };

class hash{
  tabla: any[];
  min: number;
  max: number;
  m: number;
  fun: any;
  test: any;
  size: number;
  letra: any;
  constructor(m: number,max: number,min: number,fun: any,test: any){
      this.tabla = new Array(m);
      this.min = min;
      this.max = max;
      this.m = m;
      this.fun = fun;
      this.test = test;
      this.size = 0;
      this.letra = "";
      this.inicializar();
  }

  inicializar(){
    console.log(this.tabla.length);
    this.tabla.length = this.m
    console.log(this.tabla.length);
    x1 = 0;
      for (let i = 0; i < this.tabla.length; i++) {
          this.tabla[i] = "-1";
          nodes.add(
            {id: i, label:'-1',x: x1 , y: y1, color: "rgba(97,195,238,0.5)",shape: "box"}
          );
          x1 = x1 + 90
      }
  }

  simple(){
      let k = 0.5567;
      return k * this.m;
  }

  division(k: number){
      return k % this.m;
  }

  multiplicacion(k: number){
      const A = 0.6180;
      return this.m*((k*A) % 1);
  }

  lineal(k: number){
      return ((k+1) % this.m);
  }

  cuadratica(k: number,i: number){
      return ((k+i) % this.m);
  }

  doble(k: number,i: number){
      return (((k % this.m) + i * (7-(k % 7))) % this.m);
  }

  rehash(){

      let maximo = this.size*100/this.m;
      if(maximo>=this.max){
          console.log("rehash")
          let temp = [];
          for (let k = 0; k < this.tabla.length; k++) {
              temp.push(this.tabla[k]);
          }
          this.m = this.size*100/this.min;
          this.tabla.length = this.m;
          var id = nodes.get({
            fields:['id', 'label']
          });
          console.log("id de los nodos we")
          console.log(id)
          for (var val of id){
            nodes.remove(val.id);
          }
          this.inicializar();
          this.size = 0;
          for (let j = 0; j < temp.length; j++) {
             if(temp[j]!="-1"){
                 this.insertar(temp[j]);
             }
          }
      }
  }

  imprimir(){
      console.log(this.tabla);
  }

  verificacionDato(valor: any){
      let dato = 0;
      if(typeof valor === "string"){
          for (let j = 0; j < valor.length; j++) {
             dato += valor.charCodeAt(j);
          }
      }else{
          dato = valor;
          return dato;
      }
      return dato;
  }

  //Eliminar
  eliminar(valor: any){
      let calc = this.verificacionDato(valor);

      if(this.fun == "Simple" && this.test =="Lineal"){
          let res = Math.trunc(this.simple());
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          this.tabla[res] = "-1";
          nodes.update(
            {id: res, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Simple" && this.test =="Cuadratica"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;
          }while(this.tabla[r]!=valor)
          this.tabla[r] = "-1"
          nodes.update(
            {id: r, label:"-1"}
          );;
          this.size--;

      }else if(this.fun == "Simple" && this.test =="Doble"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!=valor);
          this.tabla[r] = "-1";
          nodes.update(
            {id: r, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Division" && this.test =="Lineal"){
          let res = this.division(calc);
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          this.tabla[res] = "-1";
          nodes.update(
            {id: res, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Division" && this.test =="Cuadratica" ){
          let r;
          let res = this.division(calc);
          let iteracion = 0;

          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!=valor);
          this.tabla[r] = "-1";
          nodes.update(
            {id: r, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Division" && this.test =="Doble" ){
          let r;
          let res = this.division(calc);
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!=valor);
          this.tabla[r] = "-1";
          nodes.update(
            {id: r, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Multiplicacion" && this.test =="Lineal" ){
          let res =Math.trunc(this.multiplicacion(calc));
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          this.tabla[res] = "-1";
          nodes.update(
            {id: res, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Multiplicacion" && this.test =="Cuadratica" ){
          let r;
          let res = Math.trunc(this.multiplicacion(calc));
          let iteracion = 0;
          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!=valor);
          this.tabla[r] = "-1";
          nodes.update(
            {id: r, label:"-1"}
          );
          this.size--;

      }else if(this.fun == "Multiplicacion" && this.test =="Doble" ){
          let r;
          let res = Math.trunc(this.multiplicacion(calc));
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;

          }while(this.tabla[r]!=valor);
          this.tabla[r] = "-1";
          nodes.update(
            {id: r, label:"-1"}
          );
          this.size--;
      }
  }

  //Actualizar
  actualizar(valor: any,sustituto: any){
      let calc = this.verificacionDato(valor);

      if(this.fun == "Simple" && this.test =="Lineal"){
          let res = Math.trunc(this.simple());
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          this.tabla[res] = sustituto;
          nodes.update(
            {id: res, label:String(sustituto)}
          );

      }else if(this.fun == "Simple" && this.test =="Cuadratica"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;
          }while(this.tabla[r]!=valor)
          this.tabla[r] = sustituto;
          nodes.update(
            {id: r, label:String(sustituto)}
          );

      }else if(this.fun == "Simple" && this.test =="Doble"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!=valor);
          this.tabla[r] = sustituto;
          nodes.update(
            {id: r, label:String(sustituto)}
          );

      }else if(this.fun == "Division" && this.test =="Lineal"){
          let res = this.division(calc);
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          this.tabla[res] = sustituto;
          nodes.update(
            {id: res, label:String(sustituto)}
          );

      }else if(this.fun == "Division" && this.test =="Cuadratica" ){
          let r;
          let res = this.division(calc);
          let iteracion = 0;

          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!=valor);
          this.tabla[r] = sustituto;
          nodes.update(
            {id: r, label:String(sustituto)}
          );

      }else if(this.fun == "Division" && this.test =="Doble" ){
          let r;
          let res = this.division(calc);
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!=valor);
          this.tabla[r] = sustituto;
          nodes.update(
            {id: r, label:String(sustituto)}
          );

      }else if(this.fun == "Multiplicacion" && this.test =="Lineal" ){
          let res =Math.trunc(this.multiplicacion(calc));
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          this.tabla[res] = sustituto;
          nodes.update(
            {id: res, label:String(sustituto)}
          );

      }else if(this.fun == "Multiplicacion" && this.test =="Cuadratica" ){
          let r;
          let res = Math.trunc(this.multiplicacion(calc));
          let iteracion = 0;
          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!=valor);
          this.tabla[r] = sustituto;
          nodes.update(
            {id: r, label:String(sustituto)}
          );

      }else if(this.fun == "Multiplicacion" && this.test =="Doble" ){
          let r;
          let res = Math.trunc(this.multiplicacion(calc));
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;

          }while(this.tabla[r]!=valor);
           this.tabla[r] = sustituto;
           nodes.update(
            {id: r, label:String(sustituto)}
          );
      }
  }

  //Buscar
  buscar(valor: any){
      let calc = this.verificacionDato(valor);
      var ids = nodes.get({
        fields:['id', 'label', 'color']
      });
      console.log("id de los nodos we")
      console.log(ids)
      for (var val of ids){
        if(val.color === "#FFA807"){
          nodes.update(
            {id: val.id, color: "rgba(97,195,238,0.5)"}
          );
        }
      }
      if(this.fun == "Simple" && this.test =="Lineal"){
          let res = Math.trunc(this.simple());
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          nodes.update(
            {id: res, color: "#FFA807"}
          );
          return this.tabla[res];

      }else if(this.fun == "Simple" && this.test =="Cuadratica"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;
          }while(this.tabla[r]!=valor)
          nodes.update(
            {id: r, color: "#FFA807"}
          );
          return this.tabla[r];

      }else if(this.fun == "Simple" && this.test =="Doble"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!=valor);
          nodes.update(
            {id: r, color: "#FFA807"}
          );
          return this.tabla[r];

      }else if(this.fun == "Division" && this.test =="Lineal"){
          let res = this.division(calc);
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          nodes.update(
            {id: res, color: "#FFA807"}
          );
          return this.tabla[res];

      }else if(this.fun == "Division" && this.test =="Cuadratica" ){
          let r;
          let res = this.division(calc);
          let iteracion = 0;

          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!=valor);
          nodes.update(
            {id: r, color: "#FFA807"}
          );
          return this.tabla[r];

      }else if(this.fun == "Division" && this.test =="Doble" ){
          let r;
          let res = this.division(calc);
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!=valor);
          nodes.update(
            {id: r, color: "#FFA807"}
          );
          return this.tabla[r];

      }else if(this.fun == "Multiplicacion" && this.test =="Lineal" ){
          let res =Math.trunc(this.multiplicacion(calc));
          while(this.tabla[res]!=valor){
              res = this.lineal(res);
          }
          nodes.update(
            {id: res, color: "#FFA807"}
          );
          return this.tabla[res];

      }else if(this.fun == "Multiplicacion" && this.test =="Cuadratica" ){
          let r;
          let res = Math.trunc(this.multiplicacion(calc));
          let iteracion = 0;
          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!=valor);
          nodes.update(
            {id: r, color: "#FFA807"}
          );
          return this.tabla[r];

      }else if(this.fun == "Multiplicacion" && this.test =="Doble" ){
          let r;
          let res = Math.trunc(this.multiplicacion(calc));
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;

          }while(this.tabla[r]!=valor);
          nodes.update(
            {id: r, color: "#FFA807"}
          );
          return this.tabla[r];
      }
  }

  //Insercion
  insertar(valor: any){
      let calculo = this.verificacionDato(valor);
      if(this.fun == "Simple" && this.test=="Lineal"){
          let res = Math.trunc(this.simple());
          while(this.tabla[res]!="-1"){
              res = this.lineal(res);
          }
          this.tabla[res] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();

      }else if(this.fun == "Simple" && this.test=="Cuadratica"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;

          do{
              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;
          }while(this.tabla[r]!="-1");
          iteracion=0;
          this.tabla[r] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();

      }else if(this.fun == "Simple" && this.test=="Doble"){
          let r;
          let res = Math.trunc(this.simple());
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!="-1");
          iteracion=0;
          this.tabla[r] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();

      }else if(this.fun == "Division" && this.test=="Lineal"){
          let res = this.division(calculo);
          while(this.tabla[res]!="-1"){
              res = this.lineal(res);
          }
              this.tabla[res] = valor;
              nodes.update(
                {id: res, label:String(valor)}
              );
              this.size++;
              this.rehash();

      }else if(this.fun == "Division" && this.test=="Cuadratica"){
          let r;
          let res = this.division(calculo);
          let iteracion = 0;

          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!="-1");
          iteracion=0;
          this.tabla[r] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();

      }else if(this.fun == "Division" && this.test=="Doble"){
          let r;
          let res = this.division(calculo);
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;
          }while(this.tabla[r]!="-1");
          iteracion=0;
          this.tabla[r] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();

      }else if(this.fun == "Multiplicacion" && this.test=="Lineal"){
          let res =Math.trunc(this.multiplicacion(calculo));
          while(this.tabla[res]!="-1"){
              res = this.lineal(res);
          }
          this.tabla[res] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();

      }else if(this.fun == "Multiplicacion" && this.test=="Cuadratica"){
          let r;
          let res = Math.trunc(this.multiplicacion(calculo));
          let iteracion = 0;
          do{

              let j = Math.pow(iteracion,2);
              r = this.cuadratica(res,j);
              iteracion++;

          }while(this.tabla[r]!="-1");

          iteracion=0;
          this.tabla[r] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();
      }else if(this.fun == "Multiplicacion" && this.test=="Doble"){
          let r;
          let res = Math.trunc(this.multiplicacion(calculo));
          let iteracion = 0;
          do{
              r = this.doble(res,iteracion);
              iteracion++;

          }while(this.tabla[r]!="-1");
          iteracion=0;
          this.tabla[r] = valor;
          nodes.update(
            {id: res, label:String(valor)}
          );
          this.size++;
          this.rehash();
      }
      }
}

// let hs = new hash(10,80,20,"Multi","Doble");
// hs.insertar("hola");
// h.insertar("ala");
// h.insertar(2);
// h.insertar(4);
// h.imprimir();
// h.actualizar("ala","apa");
// h.imprimir();
// h.eliminar(4);
// h.imprimir();
// console.log(h.buscar(2));



@Component({
  selector: 'app-hash-cerrado',
  templateUrl: './hash-cerrado.component.html',
  styleUrls: ['./hash-cerrado.component.css']
})
export class HashCerradoComponent implements OnInit {
  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }

  Tamano(ta: number, max:number, min:number,dat:any,dato:any){
    h = new hash(ta, max,min,dat,dato);
    console.log(h)
  }

  AgregarNuevo(datos: any){
    console.log("Entro??")
    console.log(h);
    h.insertar(datos);
  }

  Eliminar(da: any){
    h.eliminar(da);
  }

  buscar(dato: any){
    h.buscar(dato);
  }

  Actualizars(da: any, sus: any){
    h.actualizar(da,sus);
  }

}
