class NodoBinaryTree {
    constructor (value) {
      this.value = value
      this.derecha = null
      this.izquierda = null
    }
  }
  
  class Tree {
    constructor () {
      this.raiz = null
    }
  
    isEmpty () {
      return this.raiz === null
    }
  
    addBinary (value) {
      // arbol no tiene elementos
      if (this.isEmpty()) {
        this.raiz = new NodoBinaryTree(value)
        return
      }
  
      var aux = this.raiz
  
      while (aux) {
        // vamos hacia la izquierda
        if (value < aux.value) {
          if (aux.izquierda) {
            aux = aux.izquierda
          } else {
            aux.izquierda = new NodoBinaryTree(value)
            return
          }
        } else { // vamos hacia la derecha
          if (aux.derecha) {
            aux = aux.derecha
          } else {
            aux.derecha = new NodoBinaryTree(value)
            return
          }
        }
      }
    }
  
     agregarRecursivo (value, node = this.raiz) {
      if (!node) {
        this.raiz = new NodoBinaryTree(value)
        return
      }
  
      if (value < node.value) {
        if (node.izquierda) {
          return this.agregarRecursivo(value, node.izquierda)
        }
        node.izquierda = new NodoBinaryTree(value)
        return
      } else { // vamos hacia la derecha
        if (node.derecha) {
          return this.agregarRecursivo(value, node.derecha)
        }
        node.derecha = new NodoBinaryTree(value)
        return
      }
    }
  
    find (value) {
      if (this.isEmpty()) {
        return null
      }
  
      var aux = this.raiz
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
    print (node = this.raiz) {
      if (!node) {
        return
      }
      this.print(node.izquierda)
      console.log(node.value)
      this.print(node.derecha)
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
  
  var binary = new Tree()
  //var arr = [5,2,3,-4,12,9,21,19,25]
  function agregarBinary(data){
    console.log("******************")
    binary.addBinary(data)
    binary.print()
  }
  function eliminarBinario(data){
    console.log("******************")
    binary.delete(data)
    binary.print()
  }
  function buscarBinario(data){
    console.log(binary.find(data))
  }
  
  //for (var i = 0; i < arr.length; i++) {
   // t.agregarRecursivo(arr[i])
  //}
  
  //t.inOrder()
  //t.preOrder()
  //t.postOrder()

  //console.log(t.find(12))
  //console.log(t.findRecursive(12))
  //console.log(t.find(4))
  //t.delete(12)
 
 // t.print();