let listaVerificaion = [];
class NodoBinaryTree1 {
    constructor (value) {
      this.value = value
      this.derecha = null
      this.izquierda = null
    }
  }
  
  class Tree2 {
    constructor () {
      this.raiz = null
    }
  
    isEmpty () {
      return this.raiz === null
    }
  
    addBinary (value) {
      // arbol no tiene elementos
      if (this.isEmpty()) {
        //console.log(this.raiz)
        this.raiz = new NodoBinaryTree1(value)
        return this.raiz;
      }
      var aux = this.raiz
  
      while (aux) {
        // vamos hacia la izquierda
        if (value < aux.value) {
          if (aux.izquierda) {
            aux = aux.izquierda
          } else {
            aux.izquierda = new NodoBinaryTree1(value)
            return
          }
        } else { // vamos hacia la derecha
          if (aux.derecha) {
            aux = aux.derecha
          } else {
            aux.derecha = new NodoBinaryTree1(value)
            return
          }
        }
      }
    }
  
     agregarRecursivo (value, node = this.raiz) {
      if (!node) {
        this.raiz = new NodoBinaryTree1(value)
        return
      }
  
      if (value < node.value) {
        if (node.izquierda) {
          return this.agregarRecursivo(value, node.izquierda)
        }
        node.izquierda = new NodoBinaryTree1(value)
        return
      } else { // vamos hacia la derecha
        if (node.derecha) {
          return this.agregarRecursivo(value, node.derecha)
        }
        node.derecha = new NodoBinaryTree1(value)
        return
      }
    }
  
    find (value) {
      if (this.isEmpty()) {
        return null
      }
  
      var aux = this.raiz
      console.log(aux)
      if (aux.value === value) {
       
        return aux
      }
  
      while(aux) {
        // si encontramos el nodo con el valor
        // paramos de iterar.
        if (aux.value === value) {
  
          
          break
        }
        // seguimos buscando a la derecha
        if (aux.value < value) {
          aux = aux.derecha
        } else if (aux.value > value) {
          // seguimos buscando a la izquierda
          aux = aux.izquierda
        }
      }
      // retornamos el nodo encontrado.
      // si no encontramos el nodo con el valor
      // aux, toma el valor null.
      console.log(aux)
      return aux
    }
  
  
    findMin(node = this.raiz) {
      if (!this.isEmpty()) {
        /**
          * siempre a la izquierda de cualquier nodo
          * estará el menor valor.
          * iteramos hasta el último menor.
          */
        while (node.izquierda) {
          node = node.izquierda
        }
        
        return node
      }
    }
  
    delete (value, node = this.raiz) {
      if (!node) {
        return null
      }
      if (node.value === value) {
        // no tiene hijos
        if (!node.izquierda && !node.derecha) {
          return null
        }
        // no tiene hijo izquierdo
        if (!node.izquierda) {
          return node.derecha
        }
        // no tiene hijo derecho
        if (!node.derecha) {
          return node.izquierda
        }
  
        // tiene dos hijos
        // buscamos el menor de los hijos
        var temp = this.findMin(node.derecha)
        // con ese valor reemplazamos el valor del nodo que queremos eliminar.
        node.value = temp.value;
        // seguimos iterando para reemplazar la rama que cambio,
        // eliminando el nodo que está repetido
        node.derecha = this.delete(temp.value, node.derecha)
        return node;
      }
      // buscamos a la derecha
      if (node.value < value) {
        node.derecha = this.delete(value, node.derecha)
        return node
      }
      // buscamos a la izquierda
      if (node.value > value) {
        node.izquierda = this.delete(value, node.izquierda)
        return node
      }
    }
    
    imprimir (node = this.raiz) {
      
      if (!node) {
        return
      }
      this.imprimir(node.izquierda);
      console.log(node.value)
  
      this.imprimir(node.derecha);
    }
    imprimirCombinada (node) {
      console.log(node)
      if (!node) {
        return
      }
      this.imprimir(node.izquierda);
      console.log(node.value)
  
      this.imprimir(node.derecha);
    }
    /**
      * recorre primero toda la rama izquierda
      * de izquierda al centro.
      * Luego imprime la raíz, y finalmente
      * recorre la rama derecha, del centro hacia
      * la derecha.
      */
    inOrder (node = this.raiz) {
      if (!node) {
        return
      }
      this.inOrder(node.izquierda)
      console.log(node.value)
      
      this.inOrder(node.derecha)
    }
    /**
      * Imprime primero la raíz, luego
      * toda la rama izquierda de izquierda al centro.
      * y finalmente recorre la rama derecha,
      * del centro hacia la derecha.
      */
    preOrder (node = this.raiz) {
      if (!node) {
        return
      }
      console.log(node.value)
      this.preOrder(node.izquierda)
    }
    /**
      * Recorre el árbol de izquierda hacia el centro.
      * Luego del centro hacia la derecha, y finalmente
      * imprime la raíz.
      */
    postOrder (node = this.raiz) {
      if (!node) {
        return
      }
      this.postOrder(node.izquierda)
      this.postOrder(node.derecha)
      console.log(node.value)
    }
  }
///////////////////////////////////////////////////////////
  class Node2 {
    constructor(data, next, anterior,arbol) {
        this.data = data;
        this.next = next;
        this.anterior = anterior;
        //this.arbol = new Tree2();
        this.arbol = arbol;
    };
};

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    addToHead(data,arbolito) {
        //console.log(data)
        //console.log(arbolito)
        const newNode = new Node2(data, this.head,null, new Tree2() );
        newNode.arbol.addBinary(arbolito)
        //console.log(newNode)
        //console.log(k.imprimirCombinada(newNode.arbol.raiz));
        if (this.head) {
            newNode.next = this.head;
            this.head.anterior = newNode;
            this.head = newNode;
            //console.log(newNode)
        } else {
            this.head = newNode;
            this.tail = newNode;
        };
        this.size++;
    };

    addToTail(data) {
        const newNode = new Node2(data, null, this.tail);

        if (this.tail) {
            newNode.anterior = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.tail = newNode;
            this.head = newNode;
        };
        this.size++;
    };

    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null
        };

        const newNode = new Node2(data, null, null);
        let current = this.head;
        let previous;

        if (index === 0) {
            newNode.next = current;
            current.anterior = newNode;
            this.head = newNode;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            };

            newNode.next =current;
            newNode.anterior = previous;
            current.anterior = newNode;
            previous.next = newNode;
        };
        this.size++;
    };

    removeFromHead() {
        if (!this.head) {
            return null
        };

        const valueToReturn = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.anterior = null;
        };
        this.size--;
        return valueToReturn;
    }

    removeFromTail() {
        if (!this.tail) {
            return null
        };

        const valueToReturn = this.tail.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.anterior;
            this.tail.next = null;
        };
        this.size--;
        return valueToReturn;
    };

    removeData(data) {
        let current = this.head;
        let previous = null;

        while(current !== null) {
            if (current.data === data) {
                if (!previous) {
                    this.removeFromHead();
                } else if (!current.next) {
                    this.removeFromTail();
                } else {
                    previous.next = current.next;
                    current.next.anterior = previous;
                };
                this.size--;
                return current.data;
            };
            previous = current;
            current = current.next;
        };
        return null;
    }

    print() {
        let current = this.head;
        let result = '';
        console.log("******************************")
        while(current) {
            console.log("Posicion:  " + current.data);
            console.log(current)
            result += current.data +' <-> ';
            current = current.next;
            
            
        };

        return result += ' X ';
    };
      encontrarNodo(data,arbol){
        let current = this.head;
        let result = '';
        let regreso;
        while(current) {
          if(current.data==data){
            //console.log(current.arbol)
            current.arbol.addBinary(arbol)
            //console.log(current.arbol)
            regreso = current
          }
          //console.log("cabecera: " + current.data);
          //console.log(current.arbol)
          //current.arbol.addBinary(15);
         // console.log(current.arbol)
          result += current.data +' <-> ';
          current = current.next;
          
          
        };

        //return regreso;
      }

      buscarNodo(data,arbol){
        let current = this.head;
        let result = '';
        let regreso;
        while(current) {
          if(current.data==data){
            //console.log(current.arbol)
            current.arbol.find(arbol);
            //console.log(current.arbol)
            regreso = current
          }
          //console.log("cabecera: " + current.data);
          //console.log(current.arbol)
          //current.arbol.addBinary(15);
         // console.log(current.arbol)
          result += current.data +' <-> ';
          current = current.next;
          
          
        };

        //return regreso;
      }
      eliminarNodo(data,arbol){
        let current = this.head;
        let result = '';
        let regreso;
        while(current) {
          if(current.data==data){
            //console.log(current.arbol)
            current.arbol.delete(arbol)
            //console.log(current.arbol)
            regreso = current
          }
          //console.log("cabecera: " + current.data);
          //console.log(current.arbol)
          //current.arbol.addBinary(15);
         // console.log(current.arbol)
          result += current.data +' <-> ';
          current = current.next;
          
          
        };

        //return regreso;
      }
    reversePrint() {
        let current = this.tail;
        let result = '';
        while(current) {
            result += current.data + ' <-> ';
            current = current.next;
        };

        return result += ' X ';
    };

    getSize() {
        return this.size;
    };

    isEmpty() {
        return this.size === 0;
    };
}
const doubleLinkedList = new DoubleLinkedList();
function verificar(lista){
  let verificador = false;
  for(k in listaVerificaion){
      if(listaVerificaion[k]==lista){
        return verificador = true
      }
  }return false

}
function insertarCombinada(lista,arbol){
  //console.log(lista)
  let verificacion = verificar(lista);
  //console.log(verificacion)
  if(verificacion == false){
    doubleLinkedList.addToHead(lista,arbol);
    listaVerificaion.push(lista);
  }else{
   // console.log(arbol)
    doubleLinkedList.encontrarNodo(lista,arbol);
  }
  doubleLinkedList.print()
}
function insertarCombinadaa(data1,data2){
  insertarCombinada(data1,data2);
}
function eliminarCompuesta(data1,data2){
  doubleLinkedList.eliminarNodo(data1,data2)
  doubleLinkedList.print()
}
function buscarCompuesta(data1,data2){
  doubleLinkedList.buscarNodo(data1,data2)
  //doubleLinkedList.print()
}
//insertarCombinada(8,50)
//insertarCombinada(9,55)
//insertarCombinada(8,100)
//insertarCombinada(10,100)
//doubleLinkedList.addToHead(5,m);
//doubleLinkedList.addToTail(7);
//doubleLinkedList.addToTail(8);
//doubleLinkedList.insertAt(4, 2);
//doubleLinkedList.removeFromHead();
//doubleLinkedList.removeFromTail();
//console.log(doubleLinkedList.getSize());

//console.log(doubleLinkedList.print())