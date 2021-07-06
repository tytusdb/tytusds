//COLA DE PRIORIDAD ------------------------------------------------------------------------------
class Node {
    constructor(value, priority) {
      this.value = value;
      this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
      this.values = [];
      this.sizeCola = 0;
    }
    
    enqueue(value, priority) {
      this.sizeCola++;
      let newNode = new Node(value, priority);
      this.values.push(newNode);
    
      let index = this.values.length - 1;
      const element = this.values[index];
      
      while(index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        const parent = this.values[parentIndex];
        
        if(element.priority >= parent.priority) break;
        this.values[parentIndex] = element;
        this.values[index] = parent;
        index = parentIndex;
      }
      return this.values;
    }
    
    dequeue() {
      this.sizeCola--;
      const min = this.values[0];
      const end = this.values.pop();
      if(this.values.length > 0) {
        this.values[0] = end;
        
        let index = 0;
        const length = this.values.length;
        const element = this.values[0];
        
        while(true) {
          let leftIndex = 2 * index + 1;
          let rightIndex = 2 * index + 2;
          let leftChild, rightChild;
          let swap = null;
        
          if(leftIndex < length) {
            leftChild = this.values[leftIndex];
            if(leftChild.priority < element.priority) {
              swap = leftIndex;
            }
          }
          if(rightIndex < length) {
            rightChild = this.values[rightIndex];
            if((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)) {
              swap = rightIndex;
            }
          }
          if(swap === null) break;
          this.values[index] = this.values[swap];
          this.values[swap] = element;
          index = swap;
        }
      }
      return min;
    }
  }
  


  //HUFFMAN **************************************************************************************************
class Nodo{
    constructor(valor,caracter){
        this.valor = valor;
        this.caracter = caracter;
        this.izquierdo = null;
        this.derecho = null;
    }
}
let mapOrder; // diccionario en donde ya esta ordenado todo
let cola // cola de prioridad
let codigo;

class Arbol{
    constructor(){
        this.raiz = null;
        this.contador = 0;
        this.tablaCode = [];
        this.tablaCaracter = [];
        this.arrayTexto = []
    }
    
    
    insertar(valor,caracter){
        this.contador++;
        this.raiz = this.add(valor,caracter, this.raiz);
        if(this.contador == 3){
            this.aux = this.raiz;
            this.raiz = null;
            this.contador = 0;
   
        }
    }

    add(valor,caracter, nodo){
        if (nodo == null){
            return new Nodo(valor,caracter);
        }else{
            if(this.contador == 2){ //cambios
                if(typeof caracter === 'object' ){
                    nodo.izquierdo = caracter;
                }else{
                    nodo.izquierdo = this.add(valor,caracter, nodo.izquierdo);
                }
               
            }else if(this.contador == 3){
                if(typeof caracter === 'object' ){
                    nodo.derecho = caracter;
                }else{
                    nodo.derecho = this.add(valor,caracter, nodo.derecho);
                }
                
            }
            
        }
        return nodo;
    }
   
   decodificando(nodo,code){
    if(nodo.izquierdo!=null && nodo.derecho != null){
        this.decodificando(nodo.izquierdo,code+"0")
        this.decodificando(nodo.derecho,code+"1")
    }
    if(nodo.izquierdo == null && nodo.derecho == null){
        this.tablaCode.push(code);
        this.tablaCaracter.push(nodo.caracter);
    }
    
   }
   verTabla(){
       console.log("------------------------")
       console.log("Caracter   |Codigo  ")
       for (let i = 0; i < this.tablaCode.length; i++) {
                  console.log(this.tablaCaracter[i] +"         |  "+this.tablaCode[i]);
       }
   }

    
    ingresoTexto(texto){
        
        let diccionario = new Map();
        let freq = 0;
        this.arrayTexto = texto.split("");
        //para buscar valores
        this.arrayTexto.forEach(element => {
            //para frecuencia
            for (let i = 0; i < this.arrayTexto.length; i++) {
               if(element == this.arrayTexto[i]){
                   freq++;
               }
            }
            diccionario.set(element,freq);
            freq = 0;
            
        });
        this.mapOrder = new Map([...diccionario.entries()].sort((a,b)=> a[1]-b[1])); // se ordena por frecuencia
       
        //se recorre el mapa, para ir agregando los valores a la cola
        this.cola = new PriorityQueue();
        for(var [key,value] of this.mapOrder){
          this.cola.enqueue(key,value);
        }
       
        this.comprimir();

    }

    resultado(){
        let resCode="";
        let resText="";
        this.arrayTexto.forEach(element => {
            for (let i = 0; i < this.tablaCaracter.length; i++) {
                if(element == this.tablaCaracter[i]){
                    resCode += this.tablaCode[i];
                    resText+= element;
                }
            }
            
        });
        console.log("Resultado :")
        console.log(resText);
        console.log(resCode);
    }

    comprimir(){
        while(true){
            let dato1 = this.cola.dequeue();
            let dato2 = this.cola.dequeue();
            
            let suma = dato1.priority + dato2.priority;
            this.insertar(suma,"*");
            this.insertar(dato1.priority,dato1.value)
            this.insertar(dato2.priority,dato2.value)
            if(this.cola.sizeCola == 0){
                this.cola.enqueue(this.aux,suma);
                this.decodificando(this.aux,''); // raiz del árbol
                this.verTabla();
                this.resultado(); // para imprimir el codigo 
             break;   
            }else{
                this.cola.enqueue(this.aux,suma);
                
            }
            
        }
        
    }
}

let a = new Arbol();
a.ingresoTexto("hola buenas");


