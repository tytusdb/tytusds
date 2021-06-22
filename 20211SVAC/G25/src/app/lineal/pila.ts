import {Nodopila} from './nodopila';
export class Pila {

primero:Nodopila;
tamanio:number;
//arrayNodes = [];
edges = [];
//carga = [];
      constructor() {
          this.primero = null;
          this.tamanio = 0;
      }

      apilar(dato:any,apilar:boolean) {
          const nodo = new Nodopila(dato);
          if (apilar === false) {
              if (!this.IsVacia()) {
                  if (!this.buscarrepetido(dato))
                  {
                      nodo.siguiente = this.primero;
                      this.primero = nodo;
                      this.tamanio++;
                  }
              } else {
                  this.primero = nodo;
                  this.tamanio++;
              }
          }else {
              if (!this.IsVacia()) {
                  nodo.siguiente = this.primero;
                  this.primero = nodo;
                  this.tamanio++;
              } else {
                  this.primero = nodo;
                  this.tamanio++;
              }
          }
      }

      ApilarJson(dato) {
          const nodo = new Nodopila(dato);
          if (!this.IsVacia()) {
              nodo.siguiente = this.primero;
              this.primero = nodo;
              this.tamanio++;
          } else {
              this.primero = nodo;
              this.tamanio++;
          }
      }

      //recorrido y llenado de nodos
      mostrar(){
      var arrayNodes = [];
          let i = 0;
          if (!this.IsVacia())
          {
              var actual = this.primero;
              while (actual) {
                  if (i != 0)
                  {
                      arrayNodes.push({id: i, label: actual.dato, shape: "box"});
                      this.edges.push({from: i - 1, to: i})
                      i++;
                  }else{
                      arrayNodes.push({id:i, label: actual.dato, shape: "box"});
                      i++;
                  }
                  actual = actual.siguiente;
              }
          }
          return arrayNodes;
      }

      Desapilar() {
          if(!this.IsVacia())
          {
              var actual = this.primero.dato;
              this.primero = this.primero.siguiente;
              this.tamanio--;
          }else{
              alert('No hay datos para eliminar');
          }
      }

      buscar(dato){
          var actual = this.primero;
          var encontrado = false;
          if (!this.IsVacia())
          {
              while (actual) {
                  if (actual.dato === dato) {
                      encontrado = true;
                      return true
                  }
                  actual = actual.siguiente;
              }
              if (encontrado === false){
                  alert('No se encontro el dato buscado');
              }
          }else{
              alert("No hay datos en la Pila");
          }
      }

      buscarrepetido(dato){
          var actual = this.primero;
          var encontrado = false;
          if (!this.IsVacia())
          {
              while (actual) {
                  if (actual.dato === dato) {
                      encontrado = true;
                      return true
                  }
                  actual = actual.siguiente;
              }
              if (encontrado === false){
                  return false;
              }
          }else{
              alert("No hay datos en la Pila");
          }
      }

      buscarNodoId(dato) {
          var i = 0;
          var encontrado = false;
          var actual = this.primero;
          if (!this.IsVacia()) {
              while (actual) {
                  if (dato == actual.dato) {
                      encontrado = true;
                      return i;
                  }
                  i++;
                  actual = actual.siguiente;
              }
              if (encontrado === false) {
                  alert('No se encontro el Nodo');
                  return false;
              }
          } else {
              alert("No hay datos en la Pila");

          }
      }

      remplazar(datoV, datoN){
          var actual = this.primero;
          while (actual)
          {
              if (actual.dato === datoV)
              {
                  actual.dato = datoN;
                  break;
              }
              actual = actual.siguiente;
          }
      }

      actualizar(valorV, valorN){
          if(this.buscar(valorV))
          {
              this.remplazar(valorV, valorN);
          }
      }

      IsVacia() {
          return this.primero == null;
      }
  }
