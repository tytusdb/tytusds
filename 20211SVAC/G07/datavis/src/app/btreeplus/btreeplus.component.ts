import { Component, OnInit } from '@angular/core';



class Nodo {
  valor : number;
  anterior : Nodo;
  siguiente : Nodo;
  derecho : Nodo;
  izquierdo : Nodo;


  constructor(valor) {
      this.valor = valor;
      this.anterior = null;
      this.siguiente = null;
      this.derecho = null;
      this.izquierdo = null;    
  }
}

class Rama {

  contador : number;
  hoja : boolean;
  raiz : Nodo;

  constructor() {
      this.contador = 0;//contador de elementos insertados
      this.hoja = true;//Si es hoja el nodo que vamos a insertar
      this.raiz = null;//El inicio de la lista
  }

  insertar(nodo,bandera) {
      if (this.raiz == null) {
          this.raiz = nodo;
          this.contador++;
      } else {
          let actual = this.raiz;
          do {
              if (nodo.valor <= actual.valor) {
                  
                  if (nodo.valor == actual.valor) { //permite repeticion
                      if(bandera==true){
                          this.contador++;
                          actual.siguiente = nodo;
                          nodo.anterior = actual;
                          break;
                      }
                  } else {
                      this.contador++;
                      actual.anterior = nodo;
                      nodo.siguiente = actual;
                      this.raiz = nodo;
                      break;
                  }
              } else if (actual.siguiente == null) {
                  this.contador++;
                  actual.siguiente = nodo;
                  break;
              }
              actual = actual.siguiente;
          }
          while (actual!=null);
          
      }
  }
 
}

class ArbolB {

  raiz : Rama;
  orden : number;
  arreglo : number[]
  banderaRep : boolean;
  
  constructor(orden) {
      this.raiz = null;
      this.orden = orden;
      this.banderaRep = false;
      this.arreglo = []
     
  }

  insertar(valor) {
      this.arreglo.push(valor);
      let nodo = new Nodo(valor);
      if (this.raiz == null) {
          this.raiz = new Rama();
          this.raiz.insertar(nodo,this.banderaRep);
          return;
      } else {
          let temp = this.add(nodo, this.raiz);
          if (temp instanceof Nodo) {
              this.raiz = new Rama();
              this.raiz.insertar(temp,this.banderaRep);
              this.raiz.hoja = false;
          }

      }
      //insertar(valor);
  }
  print(){
      this._print(this.raiz);
   }

   _print(rama){
      if(rama==null) return;
      let aux = rama.raiz;
   }

  add(nodo, rama) {
      if (rama.hoja) {
          rama.insertar(nodo,this.banderaRep);
          if (rama.contador == this.orden) {
              return this.dividirRama(rama);
          } else {
              return rama;
          }
      } else {
          let temp = rama.raiz;
          do {
              if (nodo.valor == temp.valor) {
                  return rama;
              } else if (nodo.valor < temp.valor) {
                  let aux = this.add(nodo, temp.izquierdo);
                  if (aux instanceof Nodo) {
                      rama.insertar(aux,this.banderaRep);
                      if (rama.contador == this.orden) {
                          return this.dividirRama(rama);
                      }
                  }
                  return rama

              } else if (temp.siguiente == null) {
                  let aux = this.add(nodo, temp.derecho);
                  if (aux instanceof Nodo) {
                      rama.insertar(aux,this.banderaRep);
                      if (rama.contador == this.orden) return this.dividirRama(rama);

                  }
                  return rama
              }
              temp = temp.siguiente;
          } while (temp != null);
      }
      return rama;
  }

  
  
  dividirRama(rama) {
      let derecha = new Rama();
      let izquierda = new Rama();
      let medio = null;
      let temp = rama.raiz;

      let inicio = 1;
      let valorMedio = this.orden / 2 + 1;
      let final = this.orden;
      let uno = null;
      let dos = null;
      for (let i = 1; i < this.orden + 1; i++, temp = temp.siguiente) {
          let nodo = new Nodo(temp.valor);
          nodo.izquierdo = temp.izquierdo;
          nodo.derecho = temp.derecho;
          
          if (nodo.derecho != null && nodo.izquierdo != null) {
              izquierda.hoja = false;
              derecha.hoja = false;
          }

          if (i >= inicio && i < valorMedio) {
              //nodo.siguiente = temp.siguiente;
              izquierda.insertar(nodo,this.banderaRep);
          } else if (i == valorMedio) {
              medio=nodo;
          } else if (i <= final && i > valorMedio) 
              derecha.insertar(nodo,this.banderaRep);
              
      }
      let aux = new Nodo(medio.valor);
     
      //se crean las ramas primero
      //izquierda.siguiente = derecha; para conectar hoja1 con hoja2
      medio.izquierdo = izquierda;
      medio.derecho = derecha;
      medio.derecho.insertar(aux);
      
      return medio;
  }

 
  /* buscar(buscado){
      let referencia = this.raiz.raiz;
      do{
          if(buscado == referencia.valor){
              console.log("encontrado");
              console.log(referencia.valor)
              return true;
              break;
          }else if(buscado < referencia.valor){
               console.log("es menor");
               if(referencia.izquierdo!=null){
                referencia = referencia.izquierdo.raiz;   
               }
           }else if(buscado > referencia.valor){
               console.log("mayor")
               if(referencia.siguiente!=null){
                   referencia = referencia.siguiente;
               }else{
                   if(referencia.derecho!=null){
                       referencia = referencia.derecho.raiz;
                   }else{
                       console.log("NO encontrado");
                       return false;
                       break;
                   }
               }
          }
          
      }while(true);
    

  } */

  /* actualizar(buscado, sustituir){
      let referencia = this.raiz.raiz;
      let cont = 0;
      do{
          if(buscado == referencia.valor){
              cont++;
              console.log("sustituido");
              referencia.valor = sustituir;
              if(cont==2){
                  break;
              }
          }else if(buscado < referencia.valor){
               console.log("es menor");
               if(referencia.izquierdo!=null){
                referencia = referencia.izquierdo.raiz;   
               }
           }else if(buscado > referencia.valor){
               console.log("mayor")
               if(referencia.siguiente!=null){
                   referencia = referencia.siguiente;
               }else{
                   if(referencia.derecho!=null){
                       referencia = referencia.derecho.raiz;
                   }else{
                       console.log("NO encontrado");
                       break;
                   }
               }
          }
          
      }while(true);
  } */


  eliminar(valor){
     this.raiz = null;
      
     //para eliminar
      for(let i=0;i<this.arreglo.length;i++){
          if(valor == this.arreglo[i]){
              this.arreglo.splice(i,1);
              break;
          }
      }
      console.log("Eliminado")
      // //para ingresar
      this.arreglo.forEach(dato => this.insertar(dato));
      console.log("Ingresado");
     
  }   

}

@Component({
  selector: 'app-btreeplus',
  templateUrl: './btreeplus.component.html',
  styleUrls: ['./btreeplus.component.css']
})
export class BtreeplusComponent implements OnInit {

  arbol : ArbolB;
  constructor() { }

  ngOnInit(): void {
  }


  add(value){
    this.arbol.insertar(value);
  }
  eliminar(value){
    this.arbol.eliminar(value);
  }
  visualizar(){
    this.arbol.print;
  }
  orden(value : number){
    this.arbol = new ArbolB(value);
  }

}
